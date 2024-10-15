import { submitFinalAnswers, saveDraftAnswer, updateDraftAnswer, getAnswersByResultId} from '../services/answerTestService.js';

export const submitFinal = async (req, res) => {
    const { testId } = req.params;
    const token = req.headers.authorization?.split(" ")[1];

    try {
        // Periksa apakah token diberikan
        if (!token) {
            return res.status(401).json({ message: 'Token tidak diberikan' });
        }

        // Panggil fungsi untuk mengirim jawaban final dan menghitung skor
        const result = await submitFinalAnswers(testId, token);
        
        // Jika berhasil, kirim respons dengan status 200
        return res.status(200).json({ message: 'Jawaban final berhasil disimpan', result });
    } catch (error) {
        // Jika ada error yang dilempar dari fungsi `submitFinalAnswers`, tangani di sini
        if (error.message.includes('Token tidak valid')) {
            return res.status(401).json({ message: 'Token tidak valid atau sudah kadaluarsa' });
        }

        if (error.message.includes('tidak ditemukan')) {
            return res.status(404).json({ message: error.message });
        }

        // Untuk kesalahan lain, gunakan status 500 sebagai fallback
        return res.status(500).json({ message: `Terjadi kesalahan: ${error.message}` });
    }
};


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
        const resultId = await saveDraftAnswer(testId, token, answers);
        return res.status(200).json({ 
            message: 'Jawaban draft berhasil disimpan',
            resultId 
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateDraft = async (req, res) => {
    const { resultId, oldOptionId, newOptionId, newAnswer } = req.body;

    if (!resultId || !oldOptionId || !newOptionId || !newAnswer) {
        return res.status(400).json({ message: 'Semua field harus diisi.' });
    }

    try {
        const updatedId = await updateDraftAnswer(resultId, oldOptionId, newOptionId, newAnswer);
        return res.status(200).json({
            message: 'Draft jawaban berhasil diperbarui.',
            resultId: updatedId,
        });
    } catch (error) {
        console.error('Error updating draft answer:', error);
        return res.status(500).json({ message: error.message });
    }
};

export const getAnswersByResultIdController = async (req, res) => {
    const { resultId } = req.params;

    try {
        const answers = await getAnswersByResultId(resultId);
        res.status(200).json(answers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};