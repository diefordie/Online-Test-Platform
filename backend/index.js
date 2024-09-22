const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("backend/src/routes/userRoutes.js");
const authorRoutes = require("backend/src/routes/authorRoutes.js");
const testRoutes = require("./src/routes/testRoutes");
const multiplechoiceRoutes = require("./src/routes/multiplechoiceRoutes")

const app = express();
// const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT || 2000;

app.use(express.json());
app.use(cors());

// Routes
app.use("/user", userRoutes);
app.use("/author", authorRoutes);
app.use("/test", testRoutes);
app.use("/multiplechoice", multiplechoiceRoutes);

app.listen(PORT, () => {
    console.log(`Express is running on port ${PORT}`);
});

// app.use(express.json());

// app.get("/api", (req, res) => {
//     res.send("Selamat datang");
// })

// app.get("/user", async (req, res) => {
//     const user = await prisma.user.findMany();

//     res.send(user);
// });