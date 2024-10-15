import { getTransactions } from '../services/riwayatransaksiService.js';

// Ambil riwayat transaksi berdasarkan user (author atau pembuat tes)
export const getTransactionHistory = async (req, res) => {
  try {
    const userId = req.user.id; // ID pengguna yang sudah diotentikasi via JWT
    const transactions = await getTransactions(userId);
    return res.status(200).json(transactions);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch transactions' });
  }
};
