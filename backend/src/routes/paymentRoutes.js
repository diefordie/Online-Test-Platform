import express from 'express';
import PaymentController from '../controllers/paymentControllers.js';

const router = express.Router();

router.post("/payment-process", PaymentController.processPayment);

router.post('/webhook', PaymentController.handleWebhook);

export default router;