import { createUser, loginUser } from '../services/userServices.js';

// registrasi
export const registrasi = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        if (!name || !email || !password || !role) {
            return res.status(400).json({ success: false, message: 'Semua field harus diisi' });
        }

        const user = await createUser({ name, email, password, role });

        return res.status(201).json({ success: true, message: 'Pengguna berhasil dibuat', user });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.message === 'EMAIL_ALREADY_REGISTERED') {
            return res.status(409).json({ success: false, message: 'Akun Anda sudah terdaftar, silahkan cek kembali' });
        } else if (error.message.startsWith('FIREBASE_ERROR:')) {
            return res.status(500).json({ success: false, message: 'Kesalahan saat membuat akun di Firebase', error: error.message });
        } else if (error.message.startsWith('DATABASE_ERROR:')) {
            return res.status(500).json({ success: false, message: 'Kesalahan saat menyimpan data pengguna', error: error.message });
        }

        return res.status(500).json({ success: false, message: 'Terjadi kesalahan saat membuat pengguna', error: error.message });
    }
};

// login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Validasi input
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Email dan password harus diisi' });
        }

        const user = await loginUser({ email, password });

        // Kirim respons sukses
        return res.status(200).json({ success: true, message: 'Login berhasil', user });
    } catch (error) {
        console.error('Error logging in:', error);
        if (error.message === 'USER_NOT_FOUND') {
            return res.status(404).json({ success: false, message: 'Pengguna tidak ditemukan' });
        } else if (error.message === 'INVALID_PASSWORD') {
            return res.status(401).json({ success: false, message: 'Kata sandi tidak valid' });
        } else if (error.message === 'AUTHOR_NOT_APPROVED') {
            return res.status(403).json({ success: false, message: 'Akun author belum disetujui.' });
        }

        return res.status(500).json({ success: false, message: 'Kesalahan saat login', error: error.message });
    }
};
