import express from 'express';
import { createTestController, fetchTestsByCategory, getAllTests, publishTestController } from 'backend/src/controllers/testControllers.js';

const router = express.Router();

router.post('/tests', createTestController);

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);

export default router;