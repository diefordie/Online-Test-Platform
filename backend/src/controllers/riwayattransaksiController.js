import { getTransactionByUserId } from '../services/riwayattransaksiService.js';

export const getUserTransactionHistory = async (req, res) => {
    const userId = req.user.id; // Gunakan userId dari middleware authenticateToken
    console.log('Received userId from token:', userId); 
    try {
        const transactions = await getTransactionByUserId(userId);
        return res.status(200).json(transactions);
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        return res.status(500).json({ error: error.message });
    }
};

// export const getTransactionDetails = async (req, res) => {
//     const transactionId = req.params.transactionId; // Get transaction ID from the request parameters
//     try {
//         const transaction = await getTransactionById(transactionId);
//         return res.status(200).json(transaction);
//     } catch (error) {
//         console.error('Error fetching transaction details:', error);
//         return res.status(500).json({ error: error.message });
//     }
// };