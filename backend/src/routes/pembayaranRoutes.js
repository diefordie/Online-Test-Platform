// routes/paymentRoutes.js
import express from 'express';
import { handlePaymentNotification } from '../controllers/pembayaranController.js';

const router = express.Router();

// Route untuk menerima notifikasi status pembayaran
router.post('/verify', handlePaymentNotification);

export default router;
