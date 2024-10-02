import express from 'express';
import { getTestResultsController } from '../controllers/resultController.js';

const router = express.Router();

router.get('/results/:userId/:testId', getTestResultsController);

export default router; 