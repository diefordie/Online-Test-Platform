import {verifyPaymentStatus} from '../services/pembayaranService'

// controllers/paymentController.js
const { verifyPaymentStatus } = require('../services/paymentService');

const handlePaymentCallback = async (req, res) => {
  const { orderId, transactionStatus } = req.body;

  try {
    // Memanggil service untuk verifikasi status pembayaran
    const result = await verifyPaymentStatus(orderId, transactionStatus);

    // Mengirimkan response ke frontend
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: 'Terjadi kesalahan pada server', error: error.message });
  }
};

module.exports = { handlePaymentCallback };
