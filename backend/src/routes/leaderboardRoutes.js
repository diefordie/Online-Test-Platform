import express from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = express.Router();
const leaderboardController = new LeaderboardController();

// Define the endpoint for the leaderboard
router.get('/api/leaderboard', async (req, res) => {
  await leaderboardController.getLeaderboard(req, res);
});

export default router;
