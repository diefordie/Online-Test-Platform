import prisma from '../../prisma/prismaClient.js';
import bcrypt from 'bcrypt';
import firebaseAdmin from '../../firebase/firebaseAdmin.js';

// Get user by ID
export const getUserById = async (userId) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        name: true,
        email: true,
        userPhoto: true,
      },
    });
    if (!user) throw new Error('User not found');
    return user;
  } catch (error) {
    throw new Error(`Failed to get user: ${error.message}`);
  }
};

// Update user profile (name, email, photo)
export const updateUserProfile = async (userId, name, email, userPhoto) => {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser && existingUser.id !== userId) {
      throw new Error('Email is already in use by another user');
    }

    // Start a transaction to ensure consistency between Firebase and Prisma
    const result = await prisma.$transaction(async (prisma) => {
      // Update email in Firebase Authentication
      await firebaseAdmin.auth().updateUser(userId, { email });

      // Update user profile in Prisma
      return await prisma.user.update({
        where: { id: userId },
        data: { name, email, userPhoto },
      });
    });

    return result;
  } catch (error) {
    throw new Error(`Failed to update profile: ${error.message}`);
  }
};

// Update user password
export const updateUserPassword = async (userId, currentPassword, newPassword) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { password: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Compare current password with the stored hash
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      throw new Error('Current password is incorrect');
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Start a transaction to ensure both Firebase and Prisma are updated
    await prisma.$transaction(async (prisma) => {
      // Update password in Firebase Authentication
      await firebaseAdmin.auth().updateUser(userId, { password: newPassword });

      // Update hashed password in Prisma
      await prisma.user.update({
        where: { id: userId },
        data: { password: hashedPassword },
      });
    });

    return { message: 'Password updated successfully' };
  } catch (error) {
    throw new Error(`Failed to update password: ${error.message}`);
  }
};
