const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createAuthorService = async (authorData) => {
    return await prisma.author.create({
        data: {
            userId: authorData.userId,
            nama: authorData.nama,
            handphoneNum: authorData.handphoneNum,
            authorPhoto: authorData.authorPhoto,
            bank: authorData.bank,
            accountBank: authorData.accountBank,
            profit: authorData.profit,
            isApproved: authorData.isApproved,
        },
    });
};

module.exports = { createAuthorService };