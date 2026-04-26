import { getHistoryByUser } from '../models/diagnosisModel.js'
import { getPool } from '../config/database.js';


export const getHistory = async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ success: false, error: 'Invalid user ID' });
  }
  let limit = parseInt(req.query.limit, 10);
  if (isNaN(limit) || limit < 1) limit = 20;
  if (limit > 100) limit = 100;

  try {
    const rows = await getHistoryByUser(userId, limit);
    // Parse symptoms and results (handles both JSON and old comma-separated strings)
    const parsedRows = rows.map(row => {
      let symptoms = row.symptoms;
      let results = row.results;
      if (typeof symptoms === 'string') {
        try {
          symptoms = JSON.parse(symptoms);
        } catch {
          symptoms = symptoms.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
        }
      }
      if (!Array.isArray(symptoms)) symptoms = [];
      if (typeof results === 'string') {
        try {
          results = JSON.parse(results);
        } catch {
          results = { diseases: [] };
        }
      }
      if (!results || typeof results !== 'object') results = { diseases: [] };
      return { ...row, symptoms, results };
    });
    res.json({ success: true, history: parsedRows });
  } catch (error) {
    console.error('History error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export const deleteHistoryRecord = async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  const recordId = parseInt(req.params.id, 10);
  if (isNaN(recordId)) return res.status(400).json({ success: false, error: 'Invalid record ID' });
  try {
    const pool = getPool();
    const [result] = await pool.execute('DELETE FROM diagnoses WHERE id = ? AND user_id = ?', [recordId, userId]);
    if (result.affectedRows === 0) return res.status(404).json({ success: false, error: 'Record not found or not owned' });
    res.json({ success: true, message: 'Record deleted' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};