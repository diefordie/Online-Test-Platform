import express from 'express';
import { createTest, getTestDetail } from '../controllers/testControllers.js';

const router = express.Router();

router.post('/create-test', createTest);
router.get('/test-detail/:testId', getTestDetail);

export default router; // Menggunakan default export