import { createUser } from '../services/userServices.js';


export const createUserController = async (req, res) => {
    console.log('Received request:', req.body); // Log the request body

    const { name, email, password, role } = req.body;

    try {
        // Validasi input
        if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Semua field harus diisi' });
        }

        // Panggil service untuk membuat pengguna
        const user = await createUser({ name, email, password, role });

        // Kirim respons sukses
        return res.status(201).json({ message: 'Pengguna berhasil dibuat', user });
    } catch (error) {
        console.error('Error creating user:', error);
        // Kirim respons kesalahan
        return res.status(500).json({ message: 'Terjadi kesalahan saat membuat pengguna', error: error.message });
    }
};




// const { createUserService } = require("backend/src/services/userServices.js");

// const createUser = async (req, res) => {
//     try {
//         console.log("Data diterima di backend:", req.body);
//         const newUser = req.body;

//         const user = await createUserService(newUser);

//         res.status(201).send({
//             data: user,
//             message: "Create user success",
//         });
//     } catch (error) {
//         res.status(500).send({
//             message: "Failed to create user",
//             error: error.message,
//         });
//     }
// };

// module.exports = { createUser };