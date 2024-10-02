import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// services/paymentService.js
const verifyPaymentStatus = async (orderId, transactionStatus) => {
    // Logika verifikasi status pembayaran
    if (transactionStatus === 'success') {
      // Anda bisa menambahkan lebih banyak logika bisnis jika diperlukan, misalnya validasi orderId
      return { message: 'Pembayaran berhasil', success: true };
    } else if (transactionStatus === 'failed') {
      return { message: 'Pembayaran gagal', success: false };
    } else {
      return { message: 'Pembayaran tertunda', success: false };
    }
  };
  
module.exports = { verifyPaymentStatus };  