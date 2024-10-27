// routes/payment.routes.js
import express from 'express';
import PaymentController from '../controllers/paymentControllers.js';

const router = express.Router();

router.post("/payment-process", PaymentController.processPayment);
// router.post("/notification", PaymentController.handleNotification);

// Route untuk pembayaran
// router.post("/payment-process", PaymentController.processPayment);

// Route untuk notification dengan penanganan khusus
router.post('/webhook', PaymentController.handleWebhook);

export default router;

