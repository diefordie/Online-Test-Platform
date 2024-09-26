// src/app.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes.js");
const authorRoutes = require("./routes/authorRoutes.js");
const testRoutes = require("./routes/testRoutes.js");
const multiplechoiceRoutes = require("./routes/multiplechoiceRoutes.js");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
}));

// Routes
app.use("/user", userRoutes);
app.use("/author", authorRoutes);
app.use("/test", testRoutes);
app.use("/multiplechoice", multiplechoiceRoutes);

// Start Server
app.listen(PORT, () => {
    console.log(`Express is running on port ${PORT}`);
});
