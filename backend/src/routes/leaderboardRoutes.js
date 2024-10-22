// routes/topScoreRoutes.js
import express from 'express';
import { getTopScores } from '../leaderboardController';

const router = express.Router();

router.get('/Result', getTopScores);

export default router;