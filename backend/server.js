import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRoutes from './src/routes/adminRoutes.js';
// import userRoutes from './src/routes/userRoutes.js';
import testRoutes from './src/routes/testRoutes.js';
import multiplechoiceRoutes from './src/routes/multiplechoiceRoutes.js';
import { handlePaymentNotification } from './src/controllers/pembayaranController.js';
import { startCleanupJob } from './src/jobs/schedularToken.js';

const app = express();
dotenv.config();
startCleanupJob();

app.use(express.json()); 

// Parsing JSON dari request body
app.use(bodyParser.json()); 

// Parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PATCH', 'PUT'],        
    credentials: true                // Jika ingin mengirimkan cookies atau auth credentials
}));

// Routes
// app.use("/auth", userRoutes);
// app.use("/author", userRoutes);
app.use("/admin", adminRoutes);
app.use("/test", testRoutes);
app.use("/multiplechoice", multiplechoiceRoutes);
app.use("/transaction", handlePaymentNotification);

// Mulai server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost ${PORT}`);
});