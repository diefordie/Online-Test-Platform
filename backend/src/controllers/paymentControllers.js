import { createTransactionToken } from 'backend/src/services/paymentServices.js';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const handlePayment = async (req, res) => {
    try {
        const { id, title, price } = req.body;

        // Simpan detail transaksi di database (menggunakan Prisma)
        await prisma.transaction.create({
            data: {
                orderId: id,
                title: title,
                price: price
            }
        });

        // Buat token transaksi Midtrans
        const token = await createTransactionToken(id, title, price);

        return res.status(200).json({ token });
    } catch (error) {
        console.error("Payment error:", error);
        return res.status(500).json({ message: 'Payment processing failed' });
    }
};
