import { getPool } from '../config/database.js';

export const saveDiagnosis = async (userId, symptoms, results) => {
  const pool = getPool();
  const [result] = await pool.execute(
    'INSERT INTO diagnoses (symptoms, results, user_id) VALUES (?, ?, ?)',
    [JSON.stringify(symptoms), JSON.stringify(results), userId]
  );
  return result.insertId;
};

export const getHistoryByUser = async (userId, limit = 20) => {
  const pool = getPool();
  // embed limit safely (already sanitized as integer)
  const query = `
    SELECT id, symptoms, results, created_at 
    FROM diagnoses 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT ${limit}
  `;
  const [rows] = await pool.execute(query, [userId]);
  return rows;
};

export const getStatsByUser = async (userId) => {
  const pool = getPool();
  const [total] = await pool.execute('SELECT COUNT(*) as total FROM diagnoses WHERE user_id = ?', [userId]);
  const [today] = await pool.execute(
    'SELECT COUNT(*) as today FROM diagnoses WHERE user_id = ? AND DATE(created_at) = CURDATE()',
    [userId]
  );
  return {
    totalDiagnoses: total[0].total,
    todayDiagnoses: today[0].today
  };
};