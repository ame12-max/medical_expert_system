import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { promisify } from 'util';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

const execAsync = promisify(exec);
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use('/api/', limiter);

// MySQL Connection Pool
let pool;
async function initDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });
    console.log('✅ MySQL database connected');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    process.exit(1);
  }
}

// Helper: verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ success: false, error: 'Access denied' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ success: false, error: 'Invalid token' });
    req.user = user;
    next();
  });
}

// Prolog query helper (unchanged)
async function queryProlog(command) {
  const prologPath = process.env.PROLOG_PATH || 'swipl';
  const knowledgePath = process.env.KNOWLEDGE_BASE_PATH || './knowledge.pl';
  try {
    const { stdout, stderr } = await execAsync(
      `${prologPath} -q -f ${knowledgePath} -- ${command}`,
      { timeout: 5000 }
    );
    if (stderr && !stderr.includes('Warning')) throw new Error(stderr);
    return stdout.trim();
  } catch (error) {
    console.error('Prolog error:', error.message);
    throw new Error(`Prolog execution failed: ${error.message}`);
  }
}

// ========== AUTH ENDPOINTS ==========
app.post('/api/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.execute(
      'INSERT INTO users (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword]
    );
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, error: 'Username already exists' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
    if (rows.length === 0) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ success: true, token, user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ========== SYMPTOMS & DIAGNOSIS (with user) ==========
app.get('/api/symptoms', async (req, res) => {
  try {
    const output = await queryProlog('--get-symptoms');
    const symptoms = JSON.parse(output);
    res.json({ success: true, symptoms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/diagnose', authenticateToken, async (req, res) => {
  const { symptoms } = req.body;
  const userId = req.user.id;
  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ success: false, error: 'Symptoms must be an array' });
  }
  try {
    const symptomsList = `[${symptoms.map(s => `'${s.replace(/'/g, "\\'")}'`).join(',')}]`;
    const output = await queryProlog(`--diagnose --symptoms="${symptomsList}"`);
    const diagnosis = JSON.parse(output);
    // Store with user_id
    await pool.execute(
      'INSERT INTO diagnoses (symptoms, results, user_id) VALUES (?, ?, ?)',
      [JSON.stringify(symptoms), JSON.stringify(diagnosis), userId]
    );
    res.json({ success: true, diagnosis });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/history', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  const limit = parseInt(req.query.limit) || 20;
  try {
    const [rows] = await pool.execute(
      'SELECT id, symptoms, results, created_at FROM diagnoses WHERE user_id = ? ORDER BY created_at DESC LIMIT ?',
      [userId, limit]
    );
    // Parse safely
    const parsed = rows.map(row => ({
      ...row,
      symptoms: (() => {
        if (Array.isArray(row.symptoms)) return row.symptoms;
        if (typeof row.symptoms === 'string') {
          try { return JSON.parse(row.symptoms); } catch { return row.symptoms.split(',').map(s => s.trim()); }
        }
        return [];
      })(),
      results: (() => {
        if (row.results && typeof row.results === 'object') return row.results;
        if (typeof row.results === 'string') {
          try { return JSON.parse(row.results); } catch { return { diseases: [] }; }
        }
        return { diseases: [] };
      })()
    }));
    res.json({ success: true, history: parsed });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/stats', authenticateToken, async (req, res) => {
  const userId = req.user.id;
  try {
    const [total] = await pool.execute('SELECT COUNT(*) as total FROM diagnoses WHERE user_id = ?', [userId]);
    const [today] = await pool.execute(
      'SELECT COUNT(*) as today FROM diagnoses WHERE user_id = ? AND DATE(created_at) = CURDATE()',
      [userId]
    );
    res.json({ success: true, stats: { totalDiagnoses: total[0].total, todayDiagnoses: today[0].today } });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Start server
async function startServer() {
  await initDatabase();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}
startServer().catch(console.error);