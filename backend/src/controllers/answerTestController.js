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
    const token = req.headers.authorization?.split(" ")[1]; // Mengambil token dari header Authorization: Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    // Mendapatkan testId dan answers dari body request
    const { testId, answers } = req.body;

    if (!testId || !answers || answers.length === 0) {
        return res.status(400).json({ message: 'Test ID dan answers harus disertakan' });
    }

    try {
        await saveDraftAnswer(testId, token, answers); // Panggil service untuk menyimpan jawaban draft
        return res.status(200).json({ message: 'Jawaban draft berhasil disimpan' });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDraft = async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]; // Mengambil token dari header Authorization: Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: 'Token tidak ditemukan' });
    }

    // Mendapatkan resultId, optionId, dan newAnswer dari body request
    const { resultId, optionId, newAnswer } = req.body;

    if (!resultId || !optionId || !newAnswer) {
        return res.status(400).json({ message: 'Result ID, Option ID, dan jawaban baru harus disertakan' });
    }

    try {
        // Memanggil fungsi untuk memperbarui jawaban draft
        await updateDraftAnswer(resultId, optionId, newAnswer); 
        
        // Mengirim response yang berisi pesan sukses dan resultId
        return res.status(200).json({ 
            message: 'Jawaban draft berhasil diperbarui',
            resultId: resultId // Kirim kembali resultId dalam respons
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


