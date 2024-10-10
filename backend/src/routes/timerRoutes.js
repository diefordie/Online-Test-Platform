// backend/src/routes/timerRoutes.js

import express from 'express';
import { getWorktime } from '../controllers/timerController.js'; 

const router = express.Router();

router.get('/:testId/worktime', getWorktime);

export default router;
