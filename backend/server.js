import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import adminRoutes from './src/routes/adminRoutes.js';
import userRoutes from './src/routes/userRoutes.js';
import testRoutes from './src/routes/testRoutes.js';
import multiplechoiceRoutes from './src/routes/multiplechoiceRoutes.js';
import answerTest from './src/routes/answerTestRoutes.js';

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
app.use("/api/auth", userRoutes);
app.use("/api/author", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/multiplechoice", multiplechoiceRoutes);
app.use("/api", answerTest);

// Mulai server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost ${PORT}`);
});