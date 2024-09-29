import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';
import adminFirebase from '../../firebase/firebaseAdmin.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

// Registrasi
export const createUser = async ({ name, email, password, role }) => {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
        throw new Error('EMAIL_ALREADY_REGISTERED');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let userRecord;
    try {
        userRecord = await adminFirebase.auth().createUser({
            email,
            password,
            displayName: name,
        });
    } catch (firebaseError) {
        console.error('Firebase Error:', firebaseError);
        throw new Error('FIREBASE_ERROR: ' + firebaseError.message);
    }

    const isApproved = role.toUpperCase() === 'AUTHOR' ? false : true;

    try {
        const user = await prisma.user.create({
            data: {
                id: userRecord.uid,
                name,
                email,
                password: hashedPassword,
                role,
                isApproved,
            },
        });

        // Generate JWT token after user registration
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            user,
            token, // Return the token along with user data
        };
    } catch (prismaError) {
        console.error('Prisma Error:', prismaError);
        throw new Error('DATABASE_ERROR: ' + prismaError.message);
    }
};

// Login
export const loginUser = async ({ email, password }) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error('USER_NOT_FOUND');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error('INVALID_PASSWORD');
        }

        // Check if the user is an Author and if they are approved
        if (user.role === 'AUTHOR' && !user.isApproved) {
            throw new Error('AUTHOR_NOT_APPROVED'); // Custom error for non-approved authors
        }

        // Check if the user is an Admin
        if (user.role === 'ADMIN') {
            throw new Error('ADMIN_NOT_ALLOWED'); // Custom error for admin login restriction
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            isApproved: user.isApproved,
            token, // Return the token
        };
    } catch (error) {
        console.error('Error logging in:', error);
        throw new Error('Error logging in: ' + error.message);
    }
};
