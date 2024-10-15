// controllers/paymentController.js
import { verifyPaymentService } from '../services/pembayaranService.js';

export const handlePaymentNotification = async (req, res) => {
  try {
    const { transactionId, status } = req.body; // Dapatkan data dari notifikasi payment gateway

    // Pastikan status dan transactionId diterima dengan benar
    if (!transactionId || !status) {
      return res.status(400).json({
        message: "Transaction ID and status are required",
      });
    }

    // Panggil service untuk memverifikasi dan meng-update pembayaran
    const updatedTransaction = await verifyPaymentService(transactionId, status);

    // Jika pembayaran sukses, kirim respon sukses dan munculkan pop-up di frontend
    if (status === "paid") {
      return res.status(200).json({
        message: "Payment verified and updated successfully",
        transaction: updatedTransaction
      });
    } else {
      return res.status(400).json({
        message: "Payment failed",
        transaction: updatedTransaction
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Error verifying payment",
      error: error.message
    });
  }
};
