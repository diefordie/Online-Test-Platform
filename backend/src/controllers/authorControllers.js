const { createAuthorService } = require("backend/src/services/authorServices.js");
 
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

module.exports = { createAuthor };