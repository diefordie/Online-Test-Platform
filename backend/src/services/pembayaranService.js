// services/paymentService.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const verifyPaymentService = async (transactionId, paymentStatus) => {
  try {
    // Update status pembayaran di database
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: { status: paymentStatus }
    });

    // Logika tambahan jika pembayaran berhasil
    if (paymentStatus === "paid") {
      // Berikan akses ke user untuk mengerjakan tes berbayar
      // Cari transaksi terkait untuk melihat user dan test-nya
      const relatedTransaction = await prisma.transaction.findUnique({
        where: { id: transactionId },
        include: { test: true, user: true }
      });

      if (!relatedTransaction) {
        throw new Error("Transaction not found");
      }

      // Update status tertentu (misalnya pada user atau history jika perlu)
      await prisma.history.create({
        data: {
          userId: relatedTransaction.userId,
          testId: relatedTransaction.testId,
          status: "unlocked"  // Atur status "unlocked" untuk tes ini
        }
      });
    }

    return updatedTransaction;
  } catch (error) {
    throw new Error("Error updating payment status: " + error.message);
  }
};
