// src/services/authorServices.js
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

const editAuthorService = async (id, authorData) => {
    try {
        const existingAuthor = await prisma.author.findUnique({
            where: { id: id },
        });

        if (!existingAuthor) {
            throw new Error("Author not found");
        }

        const updatedAuthor = await prisma.author.update({
            where: { id: id },
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

        return updatedAuthor;
    } catch (error) {
        throw new Error("Failed to update author: " + error.message);
    }
};

const getAuthorService = async () => {
    try {
        const authors = await prisma.author.findMany();
        return authors;
    } catch (error) {
        throw new Error("Failed to retrieve authors: " + error.message);
    }
};

const updateVerificationAuthorService = async (id, authorData) => {
    try {
        const existingAuthor = await prisma.author.findUnique({
            where: { id: id },
        });

        if (!existingAuthor) {
            throw new Error("Author not found");
        }

        const updatedAuthor = await prisma.author.update({
            where: { id: id },
            data: {
                isApproved: authorData.isApproved,
            },
        });

        return updatedAuthor;
    } catch (error) {
        throw new Error("Failed to update verification author: " + error.message);
    }
};

module.exports = { 
    createAuthorService, 
    editAuthorService, 
    getAuthorService, 
    updateVerificationAuthorService 
};
