const { createUserService } = require("backend/src/services/userServices.js");

const createUser = async (req, res) => {
    try {
        console.log("Data diterima di backend:", req.body);
        const newUser = req.body;

        const user = await createUserService(newUser);

        res.status(201).send({
            data: user,
            message: "Create user success",
        });
    } catch (error) {
        res.status(500).send({
            message: "Failed to create user",
            error: error.message,
        });
    }
};

module.exports = { createUser };