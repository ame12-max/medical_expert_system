import express from 'express';
import { getStats } from '../controllers/statsController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/stats', authenticateToken, getStats);

export default router;