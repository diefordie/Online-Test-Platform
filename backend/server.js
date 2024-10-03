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

dotenv.config();
const app = express();
startCleanupJob();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins

// Parsing JSON from request body
app.use(bodyParser.json()); 

// Parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// CORS configuration for specific origins
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from frontend on port 3000
    methods: ['GET', 'POST'],         // Allowed HTTP methods
    credentials: true                  // If you want to send cookies or auth credentials
}));

// Routes auth
app.use("/auth", authRoutes);

// Routes admin
app.use("/api/admin", adminRoutes);

// Routes test
app.use("/api/tests", testRoutes); // Fix the naming of the routes if needed
app.use("/api/multiplechoice", multiplechoiceRoutes);
app.use("/api/answer-test", answerTest);

// Routes author
app.use("/author", authorRoutes);

// Routes dashboard
app.use("/dashboard", dashboardRoutes); // Include the dashboard routes

// Start server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
