import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcrypt';

export const getUserById = async (userId) => {
    return await prisma.user.findUnique({
        where: { id: userId },
        select: {
            name: true,
            email: true,
            userPhoto: true,
        },
    });
};

export const updateUserProfile = async (userId, name, email, userPhoto) => {
    // Cek apakah email sudah digunakan
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });

    if (existingUser && existingUser.id !== userId) {
        throw new Error('Email is already in use by another user');
    }

    return await prisma.user.update({
        where: { id: userId },
        data: { name, email, userPhoto },
    });
};

export const updateUserPassword = async (userId, currentPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        throw new Error('Current password is incorrect');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
    });
};