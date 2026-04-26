import { createUser, findUserByUsername } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getPool } from '../config/database.js';

export const register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  try {
    const userId = await createUser(username, password);
    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ success: false, error: 'Username already exists' });
    } else {
      res.status(500).json({ success: false, error: error.message });
    }
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ success: false, error: 'Username and password required' });
  }
  try {
    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    res.json({
      success: true,
      token,
      user: { id: user.id, username: user.username }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const changePassword = async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    return res.status(400).json({ success: false, error: 'Current and new password required' });
  }
  if (newPassword.length < 4) {
    return res.status(400).json({ success: false, error: 'New password must be at least 4 characters' });
  }
  try {
    const pool = getPool();
    const [rows] = await pool.execute('SELECT password_hash FROM users WHERE id = ?', [userId]);
    if (rows.length === 0) return res.status(404).json({ success: false, error: 'User not found' });
    const valid = await bcrypt.compare(currentPassword, rows[0].password_hash);
    if (!valid) return res.status(401).json({ success: false, error: 'Current password is incorrect' });
    const newHashed = await bcrypt.hash(newPassword, 10);
    await pool.execute('UPDATE users SET password_hash = ? WHERE id = ?', [newHashed, userId]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};