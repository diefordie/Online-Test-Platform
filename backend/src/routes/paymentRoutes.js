import express from 'express';
import { handlePayment } from 'backend/src/controllers/paymentControllers.js';

const router = express.Router();

router.post('/payment', handlePayment);

export default router;
