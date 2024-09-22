const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUserService = async (newUser) => {
    return await prisma.user.create({
        data: {
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            role: newUser.role,
            userPhoto: newUser.userPhoto,
            adsBalance: newUser.adsBalance
            },
        });
    };

const getUserServices = async (id) => {
    const user = await prisma.user.findUnique({
        where: { id } 
    });

    if (user){
        user.userPhoto = user.userPhoto || '';

    return user;

    };
}

// const updateUserServices = async (id, updates) => {
//     return await prisma.user.update({
//         where: { id },
//         data: {
//             name: newUser.name,
//             email: newUser.email,
//             password: newUser.password,
//             role: newUser.role,
//             userPhoto: newUser.userPhoto || '',
//             adsBalance: newUser.adsBalance
//             },
//         });
//     };
// }



module.exports = { createUserService, getUserServices };
