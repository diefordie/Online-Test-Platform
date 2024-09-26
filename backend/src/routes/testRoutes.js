import express from 'express';
import { createTest } from '../controllers/testControllers.js';

const router = express.Router();

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

export default router; // Menggunakan default export



// const express = require("express");
// const { createTest } = require("backend/src/controllers/testControllers.js");

// const router = express.Router();

// router.post("/create-test", createTest);

// module.exports = router;