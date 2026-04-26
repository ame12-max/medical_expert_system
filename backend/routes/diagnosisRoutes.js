import express from 'express';
import { getSymptoms, diagnose } from '../controllers/diagnosisController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/symptoms', getSymptoms);
router.post('/diagnose', authenticateToken, diagnose);

export default router;