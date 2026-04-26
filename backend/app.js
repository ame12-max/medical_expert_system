import express from 'express';
import cors from 'cors';
import { apiLimiter } from './middleware/rateLimiter.js';
import authRoutes from './routes/authRoutes.js';
import diagnosisRoutes from './routes/diagnosisRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import statsRoutes from './routes/statsRoutes.js';

const app = express();

// Trust proxy (for rate limiter behind Render)
app.set('trust proxy', 1);

app.use(cors());
app.use(express.json());
app.use('/api/', apiLimiter);

// Routes
app.use('/api', authRoutes);
app.use('/api', diagnosisRoutes);
app.use('/api', historyRoutes);
app.use('/api', statsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

export default app;