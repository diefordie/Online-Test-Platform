import { getTestById, submitAnswers } from '../services/answerTestService.js';

// Middleware untuk verifikasi token JWT
export const getTest = async (req, res) => {
    const { testId } = req.params; // Mendapatkan ID tes dari URL parameter
    try {
        const test = await getTestById(testId); // Panggil fungsi service untuk mendapatkan tes berdasarkan ID
        if (!test) {
            return res.status(404).json({ message: 'Test tidak ditemukan' });
        }
        return res.status(200).json(test);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller untuk submit jawaban tes
export const answerTest = async (req, res) => {
    const { testId } = req.params; // Mendapatkan ID tes dari URL parameter
    const { token } = req.headers; // Mendapatkan token dari header Authorization
    const { answers } = req.body; // Mendapatkan jawaban dari body request

    try {
        if (!token) {
            return res.status(401).json({ message: 'Token tidak diberikan' });
        }

        const result = await submitAnswers(testId, token, answers); // Panggil service untuk submit jawaban
        return res.status(200).json({ message: 'Jawaban berhasil disimpan', result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};