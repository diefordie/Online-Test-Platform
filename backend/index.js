const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

// Route imports
const userRoutes = require("./src/routes/userRoutes.js");
const authorRoutes = require("./src/routes/authorRoutes.js");
const testRoutes = require("./src/routes/testRoutes");
const multiplechoiceRoutes = require("./src/routes/multiplechoiceRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes"); // Correct import

const app = express();

dotenv.config();

const PORT = process.env.PORT || 2000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins

// Register Routes
app.use("/user", userRoutes);
app.use("/author", authorRoutes);
app.use("/test", testRoutes);
app.use("/multiplechoice", multiplechoiceRoutes);
app.use("/dashboard", dashboardRoutes); // Correct route registration

// Server listener
app.listen(PORT, () => {
    console.log(`Express server running on port ${PORT}`);
});
