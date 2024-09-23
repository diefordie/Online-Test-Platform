import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import userRoutes from './src/routes/userRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import testRoutes from './src/routes/testRoutes.js';
import multiplechoiceRoutes from './src/routes/multiplechoiceRoutes.js';

const app = express();

// Parsing JSON dari request body
app.use(bodyParser.json()); 

// Parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Mengizinkan request dari frontend di port 3000
    methods: ['GET', 'POST'],        // Metode HTTP yang diizinkan
    credentials: true                // Jika ingin mengirimkan cookies atau auth credentials
}));

// Routes
app.use("/auth", userRoutes);
app.use("/author", authorRoutes);
app.use("/test", testRoutes);
app.use("/multiplechoice", multiplechoiceRoutes);

// Mulai server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost ${PORT}`);
});
















// app.use(express.json());

// app.get("/api", (req, res) => {
//     res.send("Selamat datang");
// })

// app.get("/user", async (req, res) => {
//     const user = await prisma.user.findMany();

//     res.send(user);
// });













// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");

// const userRoutes = require("backend/src/routes/userRoutes.js");
// const authorRoutes = require("backend/src/routes/authorRoutes.js");
// const testRoutes = require("./src/routes/testRoutes");
// const multiplechoiceRoutes = require("./src/routes/multiplechoiceRoutes")

// const app = express();
// // const prisma = new PrismaClient();

// dotenv.config();

// const PORT = process.env.PORT || 2000;

// app.use(express.json());
// app.use(cors());

// // Routes
// app.use("/user", userRoutes);
// app.use("/author", authorRoutes);
// app.use("/test", testRoutes);
// app.use("/multiplechoice", multiplechoiceRoutes);

// app.listen(PORT, () => {
//     console.log(`Express is running on port ${PORT}`);
// });
















// // app.use(express.json());

// // app.get("/api", (req, res) => {
// //     res.send("Selamat datang");
// // })

// // app.get("/user", async (req, res) => {
// //     const user = await prisma.user.findMany();

// //     res.send(user);
// // });