import prisma from '../../prisma/prismaClient.js';

export const getTransactionByUserId = async (userId) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            include: {
                test: {
                    include: {
                        author: true,  // Menambahkan relasi author
                    },
                },
            },
            orderBy: {
                paymentTime: 'desc',  // Mengatur sorting berdasarkan waktu pembayaran
            },
        });
        return transactions;
    } catch (error) {
        throw new Error('Failed to retrieve transaction history');
    }
};

export const getTransactionById = async (transactionId) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id: transactionId },
            include: {
                test: {
                    include: {
                        author: true,  // Menambahkan include author untuk mendapatkan nama author
                    }
                },
                user: true,
            }
        });
        if (!transaction) {
            throw new Error('Transaction not found');
        }
        return transaction;
    } catch (error) {
        throw new Error('Failed to retrieve transaction details');
    }
};
