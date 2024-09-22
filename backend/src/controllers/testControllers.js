const { createTestService } = require("backend/src/services/testServices.js");

const createTest = async (req, res) => {
    try {
        const newTest = req.body;

        const test = await createTestService(newTest);

        res.status(201).send({
            data: test,
            message: "Create test success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create test",
            error: error.message,
        });
    }
};

module.exports = { createTest };