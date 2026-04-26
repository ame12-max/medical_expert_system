import { getAllSymptoms, getDiagnosis } from '../services/prologService.js';
import { saveDiagnosis } from '../models/diagnosisModel.js';

export const getSymptoms = async (req, res) => {
  try {
    const symptoms = await getAllSymptoms();
    res.json({ success: true, symptoms });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

export const diagnose = async (req, res) => {
  const { symptoms } = req.body;
  const userId = parseInt(req.user.id, 10);
  if (!symptoms || !Array.isArray(symptoms)) {
    return res.status(400).json({ success: false, error: 'Symptoms must be an array' });
  }
  try {
    const diagnosis = await getDiagnosis(symptoms);
    await saveDiagnosis(userId, symptoms, diagnosis);
    res.json({ success: true, diagnosis });
  } catch (error) {
    console.error('Diagnosis error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};