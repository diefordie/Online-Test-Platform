// src/controllers/authorControllers.js
const { 
    createAuthorService, 
    editAuthorService, 
    getAuthorService, 
    updateVerificationAuthorService 
} = require("../services/authorServices.js");

const createAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const author = await createAuthorService(authorData);
        res.status(201).send({
            data: author,
            message: "Create author success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create author",
            error: error.message,
        });
    }
};

const editAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const { id } = req.params;
        console.log("ID Penulis yang akan diedit:", id);
        const author = await editAuthorService(id, authorData);
        res.status(200).send({
            data: author,
            message: "Edit author success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to edit author",
            error: error.message,
        });
    }
};

const getAuthor = async (req, res) => { 
    try {
        const authors = await getAuthorService();
        res.status(200).send({
            data: authors,
            message: "Get author success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to get author",
            error: error.message,
        });
    }
};

const editVerifiedAuthor = async (req, res) => {
    try {
        const authorData = req.body;
        const { id } = req.params;
        console.log("ID Penulis yang akan diedit:", id);
        const author = await updateVerificationAuthorService(id, authorData);
        res.status(200).send({
            data: author,
            message: "Edit author success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to edit author",
            error: error.message,
        });
    }
};

module.exports = { createAuthor, editAuthor, getAuthor, editVerifiedAuthor };
