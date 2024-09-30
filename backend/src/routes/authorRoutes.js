// src/routes/authorRoutes.js
const express = require("express");
const { createAuthor, editAuthor, getAuthor, editVerifiedAuthor } = require("../controllers/authorControllers");

const router = express.Router();

router.post("/create-author", createAuthor);
router.put("/edit-author/:id", editAuthor);
router.patch("/edit-author/:id/status", editVerifiedAuthor);
router.get("/get-author", getAuthor);

module.exports = router;
