import { PrismaClient } from '@prisma/client';
import axios from 'axios';

const prisma = new PrismaClient();

class WithdrawalService {
    constructor() {
        this.irisClient = axios.create({
            baseURL: 'https://app.sandbox.midtrans.com/iris',
            timeout: 5000,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-Idempotency-Key': Date.now().toString(),
                'Authorization': `Basic ${Buffer.from(`${process.env.MIDTRANS_SERVER_KEY}:`).toString('base64')}`
            }
        });
    }

    async createWithdrawal(data) {
        const { authorId, amount, bankCode, accountNumber, accountName } = data;

        // Validasi input
        if (!bankCode || typeof bankCode !== 'string') {
            throw new Error('Bank code harus valid');
        }

        // Penting: bank code harus lowercase untuk Iris
        const normalizedBankCode = bankCode.toLowerCase();

        // Validasi amount (dalam rupiah)
        if (amount < 50000) {
            throw new Error('Minimum penarikan Rp 50.000');
        }

        if (amount % 1000 !== 0) {
            throw new Error('Amount harus dalam kelipatan 1000');
        }

        // Validasi nomor rekening untuk sandbox
        if (!this.validateAccountNumber(normalizedBankCode, accountNumber)) {
            throw new Error('Format nomor rekening tidak valid');
        }

        // Cek saldo author
        const author = await prisma.author.findUnique({
            where: { id: authorId },
            select: {
                id: true,
                name: true,
                profit: true
            }
        });

        if (!author) {
            throw new Error('Author tidak ditemukan');
        }

        if (author.profit < amount) {
            throw new Error(`Saldo tidak mencukupi. Saldo Anda: Rp ${author.profit.toLocaleString()}`);
        }

        try {
            const withdrawal = await prisma.$transaction(async (prisma) => {
                // Kurangi saldo
                const updatedAuthor = await prisma.author.update({
                    where: { id: authorId },
                    data: {
                        profit: {
                            decrement: amount
                        }
                    }
                });

                // Buat record withdrawal
                const newWithdrawal = await prisma.withdrawal.create({
                    data: {
                        authorId,
                        amount,
                        bankCode: normalizedBankCode,
                        accountNumber,
                        accountName,
                        status: 'PENDING',
                        notes: 'Menunggu proses Iris Midtrans'
                    }
                });

                return { withdrawal: newWithdrawal, updatedAuthor };
            });

            try {
                // Format sesuai dokumentasi Iris terbaru
                const payoutData = {
                    payouts: [{  // Wrap dalam array payouts
                        beneficiary_name: accountName,
                        beneficiary_account: accountNumber,
                        beneficiary_bank: normalizedBankCode, // gunakan lowercase
                        beneficiary_email: author.email || 'recipient@example.com',
                        amount: String(amount),
                        notes: `Payout untuk ${author.name}`,
                        reference_no: `WD-${Date.now()}` // Gunakan timestamp untuk unique reference
                    }]
                };

                console.log('Sending payout request to Iris:', JSON.stringify(payoutData, null, 2));

                const irisResponse = await this.irisClient.post('/payouts', payoutData);
                console.log('Iris API Response:', JSON.stringify(irisResponse.data, null, 2));

                // Update reference number dari Iris
                await prisma.withdrawal.update({
                    where: { id: withdrawal.withdrawal.id },
                    data: {
                        reference: irisResponse.data.payouts[0].reference_no || 
                                 irisResponse.data.reference_no || 
                                 payoutData.payouts[0].reference_no,
                        status: 'PROCESSING'
                    }
                });

                return withdrawal.withdrawal;

            } catch (irisError) {
                console.error('Iris API Error:', irisError.response?.status);
                console.error('Iris API Error Detail:', JSON.stringify(irisError.response?.data || irisError.message, null, 2));

                // Rollback transaction if Iris API fails
                await prisma.$transaction(async (prisma) => {
                    await prisma.author.update({
                        where: { id: authorId },
                        data: {
                            profit: {
                                increment: amount
                            }
                        }
                    });

                    await prisma.withdrawal.update({
                        where: { id: withdrawal.withdrawal.id },
                        data: {
                            status: 'FAILED',
                            notes: `Gagal: ${irisError.response?.data?.errors?.[0]?.message || 
                                          irisError.response?.data?.error_message || 
                                          irisError.message}`
                        }
                    });
                });

                const errorMessage = irisError.response?.data?.errors?.[0]?.message ||
                                   irisError.response?.data?.error_message || 
                                   irisError.response?.data?.message ||
                                   irisError.message;
                throw new Error(`Gagal memproses penarikan ke Iris: ${errorMessage}`);
            }

        } catch (error) {
            throw new Error('Gagal memproses penarikan: ' + error.message);
        }
    }

    validateAccountNumber(bankCode, accountNumber) {
        // Format untuk sandbox
        const bankFormats = {
            'mandiri': /^\d{13}$/,      // 13 digits
            'bca': /^\d{10}$/,          // 10 digits
            'bni': /^\d{10}$/,          // 10 digits
            'bri': /^\d{15}$/,          // 15 digits
            'permata': /^\d{10,16}$/    // 10-16 digits
        };

        return bankFormats[bankCode]?.test(accountNumber) || false;
    }
}

export default new WithdrawalService();