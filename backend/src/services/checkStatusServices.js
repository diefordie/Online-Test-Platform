import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();  

export const getTransactionStatus = async (userId, testId) => {
    const transaction = await prisma.transaction.findFirst({
        where: {
            userId: userId,
            testId: testId
        }
    });

    return transaction;
};
