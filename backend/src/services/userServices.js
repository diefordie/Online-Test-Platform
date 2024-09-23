import bcrypt from 'bcrypt';
import prisma from '../../prisma/prismaClient.js';
import admin from '../../firebase/firebaseAdmin.js';

export const createUser = async ({ name, email, password, role }) => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Firebase Authentication
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName: name,
        });

        // Log the user data before creating in Prisma
        console.log('Creating user in Prisma:', { 
            id: userRecord.uid, 
            name, 
            email, 
            password: hashedPassword, 
            role 
        });

        // Tentukan nilai isApproved berdasarkan role
        const isApproved = role.toUpperCase() === 'AUTHOR' ? false : true;

        // Store additional user data in PostgreSQL using Prisma
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

        return user;
    } catch (error) {
        console.error('Error creating user:', error); 
        throw new Error('Terjadi kesalahan saat membuat pengguna: ' + error.message);
    }
};























// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// const createUserService = async (newUser) => {
//     return await prisma.user.create({
//         data: {
//             name: newUser.name,
//             email: newUser.email,
//             password: newUser.password,
//             role: newUser.role,
//             userPhoto: newUser.userPhoto,
//             adsBalance: newUser.adsBalance
//             },
//         });
//     };

// const getUserServices = async (id) => {
//     const user = await prisma.user.findUnique({
//         where: { id } 
//     });

//     if (user){
//         user.userPhoto = user.userPhoto || '';

//     return user;

//     };
// }

// // const updateUserServices = async (id, updates) => {
// //     return await prisma.user.update({
// //         where: { id },
// //         data: {
// //             name: newUser.name,
// //             email: newUser.email,
// //             password: newUser.password,
// //             role: newUser.role,
// //             userPhoto: newUser.userPhoto || '',
// //             adsBalance: newUser.adsBalance
// //             },
// //         });
// //     };
// // }



// module.exports = { createUserService, getUserServices };
