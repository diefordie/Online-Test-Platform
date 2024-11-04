// routes/withdrawalRoutes.js
import express from 'express';
import WithdrawalController from '../controllers/payoutControllers.js';

const router = express.Router();

// Routes untuk Author
router.post('/create', WithdrawalController.createWithdrawal);
router.get('/history', WithdrawalController.getWithdrawalHistory);

// Routes untuk Admin
router.get('/all', WithdrawalController.getAllWithdrawals);
router.put('/:id/process', WithdrawalController.processWithdrawal);

export default router;