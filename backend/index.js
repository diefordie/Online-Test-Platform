const express = require("express");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.get("/user", async (req, res) => {
    const user = await prisma.user.findMany();

    res.send(user);
});

app.post("/user", async (req, res) => {
    const newUser = req.body;
    
    const user = await prisma.user.create({
        data: {
            name : newUser.name,
            email : newUser.name,
            password : newUser.password,
            role : newUser.role,
        },
    });

    res.send ({
        data : user,
        message : "create user success",
    });
});

app.post("/test", async (req, res) => {
    const newTest = req.body;
    
    const test = await prisma.test.create({
        data: {
            userId : newTest.userId,
            category : newTest.category,
            title : newTest.title,
            description : newTest.description,
            price : newTest.price,
            similarity : newTest.similarity,
            worktime : newTest.worktime, 
            review : newTest.review
        },
    });

    res.send ({
        data : test,
        message : "create test success",
    });
});

app.listen(PORT, () => {
    console.log("Express API running in port: " + PORT);
});