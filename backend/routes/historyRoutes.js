import express from 'express';
import { getHistory, deleteHistoryRecord } from '../controllers/historyController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/history', authenticateToken, getHistory);
router.delete('/history/:id', authenticateToken, deleteHistoryRecord);


export default router;