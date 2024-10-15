import express from 'express';
import midtransClient from "midtrans-client";
import prisma from '../../prisma/prismaClient.js'; 

const router = express.Router();

router.post("/payment-process", async (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SECRET_KEY,
            clientKey: process.env.PUBLIC_CLIENT_KEY,
        });

        const testId = req.body.testId;  

        const test = await prisma.test.findFirst({
            where: {
                id: testId  
            }
        });

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        const orderId = `${test.Id}-${Date.now()}`;    
        const grossAmount = test.price;  

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            callbacks: {
                finish: process.env.DOMAIN  
            },
            enabled_payments: [
                "mandiri_clicpay", "bca_clicpay", "bni_va", "bca_va",
            ],
        };

        snap.createTransaction(parameter)
        .then((snapResponse) => {
            res.status(200).json({ token: snapResponse.token });
        })
        .catch((error) => {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
        console.error("Server error:", error); 
        return res.status(500).json({ error: error.message });
    }
});

export default router;
