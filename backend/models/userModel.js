import { getPool } from '../config/database.js';
import bcrypt from 'bcrypt';

export const createUser = async (username, password) => {
  const pool = getPool();
  const hashedPassword = await bcrypt.hash(password, 10);
  const [result] = await pool.execute(
    'INSERT INTO users (username, password_hash) VALUES (?, ?)',
    [username, hashedPassword]
  );
  return result.insertId;
};

export const findUserByUsername = async (username) => {
  const pool = getPool();
  const [rows] = await pool.execute('SELECT * FROM users WHERE username = ?', [username]);
  return rows[0];
};