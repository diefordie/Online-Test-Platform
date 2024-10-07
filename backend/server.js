import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import { startCleanupJob } from './src/jobs/schedularToken.js';
import authorRoutes from './src/routes/authorRoutes.js';

import testRoutes from './src/routes/testRoutes.js';
import multiplechoiceRoutes from './src/routes/multiplechoiceRoutes.js';
import answerTest from './src/routes/answerTestRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';

dotenv.config();
const app = express();
startCleanupJob();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins

// Parsing JSON dari request body
app.use(bodyParser.json()); 

// Parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Mengizinkan request dari frontend di port 3000
    methods: ['GET', 'POST'],        // Metode HTTP yang diizinkan
    credentials: true                // Jika ingin mengirimkan cookies atau auth credentials
}));

// Routes auth
app.use("/auth", authRoutes);

// Routes admin
app.use("/api/admin", adminRoutes);

// Routes test
app.use("/api/tests", testRoutes);//diperbaiki lagi penamaan routesnya
app.use("/api/multiplechoice", multiplechoiceRoutes);
app.use("/api/answer-test", answerTest);
app.use("/api", paymentRoutes);


// Routes author
app.use("/author", authorRoutes);

// Routes dashboard
app.use("/dashboard", dashboardRoutes);

// Mulai server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost ${PORT}`);
});