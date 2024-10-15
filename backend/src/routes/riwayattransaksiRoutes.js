import express from 'express';
import { getTransactionHistory } from '../controllers/riwayattransaksiController.js';

const router = express.Router();

// Dapatkan riwayat transaksi berdasarkan userId (yang sudah diotentikasi)
router.get('/transaksi', getTransactionHistory);

export default router;
