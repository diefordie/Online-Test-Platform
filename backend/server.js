// server.js
const express = require('express');
const testRoutes = require('./src/routes/testRoutes'); // Pastikan path benar

const app = express();

// Middleware
app.use(express.json());

// Menggunakan rute
app.use('/api', testRoutes); // Misalnya, prefiks rute dengan /api

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
