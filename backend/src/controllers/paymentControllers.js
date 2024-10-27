import PaymentService from '../services/paymentServices.js';

class PaymentController {
    processPayment = async (req, res) => {
        try {
            const { testId } = req.body;
            
            if (!testId) {
                return res.status(400).json({ 
                    error: 'testId is required' 
                });
            }

            const result = await PaymentService.createPaymentToken(testId);
            
            console.log('Payment token created:', {
                testId,
                token: result.token
            });

            res.status(200).json({ token: result.token });
        } catch (error) {
            console.error("Payment process error:", {
                error: error.message,
                stack: error.stack,
                testId: req.body.testId
            });
            res.status(500).json({ error: error.message });
        }
    }

    handleWebhook = async (req, res) => {
        try {
            // Log the entire request body for debugging
            console.log('Received webhook payload:', req.body);

            // Midtrans sends notification data directly in req.body
            const notificationData = req.body;

            // Validate notification data
            if (!notificationData || !notificationData.transaction_status) {
                console.error('Invalid notification data:', notificationData);
                return res.status(400).json({
                    error: 'Invalid notification data'
                });
            }

            // Process the notification
            const status = await PaymentService.processNotification(notificationData);

            console.log('Payment notification processed:', {
                orderId: notificationData.order_id,
                status: status
            });

            // Midtrans expects 200 response
            return res.status(200).json({
                status: 'success',
                message: 'Notification processed successfully'
            });
        } catch (error) {
            console.error('Webhook processing error:', {
                error: error.message,
                stack: error.stack,
                body: req.body
            });

            // Tetap return 200 untuk Midtrans meski ada error
            return res.status(200).json({
                status: 'error',
                message: error.message
            });
        }
    };
}

export default new PaymentController();