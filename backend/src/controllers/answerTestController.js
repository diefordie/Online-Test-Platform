import { submitFinalAnswers, saveDraftAnswer, updateDraftAnswer } from '../services/answerTestService.js';
import jwt from 'jsonwebtoken'; // Pastikan untuk mengimpor jwt


export const submitFinal = async (req, res) => {
    const { testId } = req.params; // Mendapatkan ID tes dari URL parameter
    const { token } = req.headers; // Mendapatkan token dari header Authorization

    try {
        if (!token) {
            return res.status(401).json({ message: 'Token tidak diberikan' });
        }

        const result = await submitFinalAnswers(testId, token); // Panggil service untuk submit jawaban final
        return res.status(200).json({ message: 'Jawaban final berhasil disimpan', result });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}


export const saveDraft = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    const { testId, answers } = req.body;

    if (!testId || !answers || answers.length === 0) {
        return res.status(400).json({ message: 'Test ID dan answers harus disertakan' });
    }

    try {
        const resultId = await saveDraftAnswer(testId, token, answers); // Ambil resultId
        return res.status(200).json({ 
            message: 'Jawaban draft berhasil disimpan',
            resultId // Kembalikan resultId
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const updateDraft = async (req, res) => {
    const { resultId, oldOptionId, newOptionId, newAnswer } = req.body;

    // Validasi input
    if (!resultId || !oldOptionId || !newOptionId || !newAnswer) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    try {
        // Memanggil fungsi untuk memperbarui jawaban draft
        const updatedId = await updateDraftAnswer(resultId, oldOptionId, newOptionId, newAnswer);

        // Mengembalikan respons sukses
        return res.status(200).json({
            message: 'Draft jawaban berhasil diperbarui.',
            resultId: updatedId,
        });
    } catch (error) {
        // Menangani kesalahan
        console.error('Error updating draft answer:', error);
        return res.status(500).json({ message: error.message });
    }
};