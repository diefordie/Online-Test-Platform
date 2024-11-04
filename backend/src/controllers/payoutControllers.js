import { PrismaClient } from '@prisma/client';
import withdrawalService from '../services/payoutServices.js';

const prisma = new PrismaClient();

class WithdrawalController {
  async createWithdrawal(req, res) {
    try {
      // Ambil authorId langsung dari body request
      const { authorId, amount, bankCode, accountNumber, accountName } = req.body;

      // Validasi input
      if (!authorId || !amount || !bankCode || !accountNumber || !accountName) {
        return res.status(400).json({ 
          success: false, 
          message: 'Semua field harus diisi (authorId, amount, bankCode, accountNumber, accountName)' 
        });
      }

      // Validasi jumlah minimum penarikan
      if (amount < 50000) {
        return res.status(400).json({
          success: false,
          message: 'Jumlah minimum penarikan adalah Rp 50.000'
        });
      }

      const withdrawal = await withdrawalService.createWithdrawal({
        authorId,
        amount,
        bankCode,
        accountNumber,
        accountName
      });

      res.status(201).json({
        success: true,
        data: withdrawal
      });
    } catch (error) {
      console.error('Error in createWithdrawal:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan saat membuat permintaan penarikan'
      });
    }
  }

  async getWithdrawalHistory(req, res) {
    try {
      // Ambil authorId dari query params atau request body
      const { authorId } = req.query;

      if (!authorId) {
        return res.status(400).json({
          success: false,
          message: 'AuthorId harus disertakan'
        });
      }

      const withdrawals = await withdrawalService.getWithdrawalsByAuthorId(authorId);
      
      res.status(200).json({
        success: true,
        data: withdrawals
      });
    } catch (error) {
      console.error('Error in getWithdrawalHistory:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengambil riwayat penarikan'
      });
    }
  }

  async getAllWithdrawals(req, res) {
    try {
      const withdrawals = await withdrawalService.getAllWithdrawals();
      
      res.status(200).json({
        success: true,
        data: withdrawals
      });
    } catch (error) {
      console.error('Error in getAllWithdrawals:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan saat mengambil data penarikan'
      });
    }
  }

  async processWithdrawal(req, res) {
    try {
      const { id } = req.params;
      const withdrawal = await withdrawalService.processWithdrawal(id);
      
      res.status(200).json({
        success: true,
        data: withdrawal
      });
    } catch (error) {
      console.error('Error in processWithdrawal:', error);
      res.status(500).json({
        success: false,
        message: error.message || 'Terjadi kesalahan saat memproses penarikan'
      });
    }
  }
}

export default new WithdrawalController();