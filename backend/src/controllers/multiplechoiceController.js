const { createMultipleChoiceService } = require("backend/src/services/multiplechoiceSevice.js");

const createMultipleChoice = async (req, res) => {
    try {
        const { testId, questions } = req.body;

        // Pastikan testId dan questions dikirimkan
        if (!testId || !questions) {
            return res.status(400).send({
                message: "testId and questions are required",
            });
        }

        // Panggil service untuk membuat soal beserta opsi
        const multipleChoices = await createMultipleChoiceService(testId, questions);

        res.status(201).send({
            data: multipleChoices,
            message: "Multiple choice questions created successfully",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create multiple choice questions",
            error: error.message,
        });
    }
};

module.exports = { createMultipleChoice };