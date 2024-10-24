import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient(); 

export const checkTransactionStatus = async (req, res) => {
  const userId = req.user.id; // Ambil user ID dari permintaan yang sudah diautentikasi
  const { testId } = req.query; // Sekarang mendapatkan test ID dari parameter query

  try {
    // Mencari transaksi berdasarkan userId dan testId
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        testId: testId,
      },
    });

    if (!transaction) {
      // Jika tidak ada transaksi ditemukan, alihkan ke halaman kuis terkunci
      return res.status(302).json({
        message: 'Dapatkan akses.',
        redirectUrl: 'http://localhost:3000/tes/kuis-terkunci-akses',
      });
    }

    // Cek status transaksi
    switch (transaction.status) {
      case 'SUCCESS':
        return res.status(302).json({
          redirectUrl: 'http://localhost:3000/tes/mengerjakan-tes',
        });
      case 'PENDING':
        return res.status(302).json({
          message: 'Menunggu pembayaran.',
          redirectUrl: 'http://localhost:3000/tes/kuis-terkunci-pending',
        });
      case 'FAILED':
        return res.status(302).json({
          message: 'Pembayaran gagal. Silakan coba lagi.',
          redirectUrl: 'http://localhost:3000/tes/kuis-terkunci',
        });
      default:
        return res.status(404).json({ message: 'Status transaksi tidak dikenal.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Kesalahan internal server.' });
  }
};
