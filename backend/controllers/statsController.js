import { getStatsByUser } from '../models/diagnosisModel.js';

export const getStats = async (req, res) => {
  const userId = parseInt(req.user.id, 10);
  try {
    const stats = await getStatsByUser(userId);
    res.json({ success: true, stats });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};