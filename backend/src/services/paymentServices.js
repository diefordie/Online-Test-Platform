import Midtrans from "midtrans-client";

let snap = new Midtrans.Snap({
    isProduction: false,
    serverKey: process.env.SECRET,
    clientKey: process.env.NEXT_PUBLIC_CLIENT
});

export const createTransactionToken = async (orderId, title, price) => {
    let parameter = {
        item_details: [{
            id: orderId,
            name: title,
            price: price,
            quantity: 1
        }],
        transaction_details: {
            order_id: orderId,
            gross_amount: price
        }
    };

    try {
        const transaction = await snap.createTransaction(parameter);
        return transaction.token;  // Token transaksi Midtrans
    } catch (error) {
        console.error("Error creating transaction token", error);
        throw new Error('Failed to create transaction token');
    }
};
