import express from 'express';
import { getTest, answerTest } from '../controllers/answerTestController.js';

const router = express.Router();

// Route untuk mengambil detail tes berdasarkan ID
// GET /api/tests/:testId
router.get('/test/:testId', getTest);

// Route untuk submit jawaban tes
// POST /api/tests/:testId/submit
router.post('/tests/:testId/submit', answerTest);

export default router;