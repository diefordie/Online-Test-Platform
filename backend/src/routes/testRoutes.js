import express from 'express';
import { createTestController, fetchTestsByCategory, getAllTests, publishTestController } from 'backend/src/controllers/testControllers.js';

const router = express.Router();

<<<<<<< HEAD
// router.post('/create-test', createTest);

router.post('/create-test', async (req, res) => {
    console.log(req.body); // Menambahkan log untuk melihat data yang diterima

    try {
        const { jenis, category, title, testDescription, similarity } = req.body;

        // Misalkan Anda membuat instance baru dari model Test
        const newTest = new Test({
            jenis,
            category,
            title,
            testDescription,
            similarity,
        });

        await newTest.save(); // Simpan ke database
        res.status(201).json(newTest); // Mengirimkan respons sukses
    } catch (error) {
        console.error('Error creating test:', error);
        res.status(500).json({ message: 'Internal Server Error' }); // Menangani kesalahan
    }
});
=======
router.post('/tests', createTestController);
>>>>>>> 0982b85c08b9e2ca0483c68c1299aba757bb0056

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);

export default router;