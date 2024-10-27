import midtransClient from 'midtrans-client';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class PaymentService {
    constructor() {
        // Initialize Midtrans clients with error handling
        try {
            this.snap = new midtransClient.Snap({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
                clientKey: process.env.MIDTRANS_CLIENT_KEY,
            });

            this.core = new midtransClient.CoreApi({
                isProduction: false,
                serverKey: process.env.MIDTRANS_SERVER_KEY,
                clientKey: process.env.MIDTRANS_CLIENT_KEY
            });
        } catch (error) {
            console.error('Failed to initialize Midtrans clients:', error);
            throw new Error('Payment service initialization failed');
        }
    }

    async createPaymentToken(testId) {
        try {
            const test = await prisma.test.findFirst({
                where: { id: testId }
            });

            if (!test) {
                throw new Error(`Test not found with ID: ${testId}`);
            }

            const orderId = `${test.id}-${Date.now()}`;
            const parameter = {
                transaction_details: {
                    order_id: orderId,
                    gross_amount: test.price,
                },
                callbacks: {
                    finish: process.env.DOMAIN
                },
                enabled_payments: [
                    "mandiri_clicpay", "bca_clicpay", "bni_va", "bca_va",
                ],
            };

            // Log the payment creation attempt
            console.log(`Creating payment for test ID: ${testId}`, {
                orderId,
                amount: test.price
            });

            await prisma.test.update({
                where: { id: testId },
                data: {
                    status: 'PENDING',
                    paymentId: orderId
                }
            });

            const snapResponse = await this.snap.createTransaction(parameter);
            
            // Log successful payment token creation
            console.log(`Payment token created for order ID: ${orderId}`);
            
            return snapResponse;
        } catch (error) {
            console.error('Error creating payment token:', {
                testId,
                error: error.message,
                stack: error.stack
            });
            throw new Error(`Failed to create payment token: ${error.message}`);
        }
    }

    async processNotification(notification) {
        try {
            // Enhanced input validation
            if (!notification || typeof notification !== 'object') {
                throw new Error(`Invalid notification payload: ${JSON.stringify(notification)}`);
            }

            // Log the raw notification
            console.log('Processing payment notification:', {
                timestamp: new Date().toISOString(),
                notification: JSON.stringify(notification)
            });

            const {
                transaction_status: transactionStatus,
                fraud_status: fraudStatus,
                order_id: orderId
            } = notification;

            // Validate required fields
            if (!orderId) {
                throw new Error('Missing order_id in notification');
            }
            if (!transactionStatus) {
                throw new Error('Missing transaction_status in notification');
            }

            // Determine payment status
            let status = this.determinePaymentStatus(transactionStatus, fraudStatus);

            // Find and update test status
            const test = await prisma.test.findFirst({
                where: { paymentId: orderId }
            });

            if (!test) {
                throw new Error(`Test not found for order ID: ${orderId}`);
            }

            await prisma.test.update({
                where: { id: test.id },
                data: { status }
            });

            // Log successful status update
            console.log('Payment status updated:', {
                orderId,
                testId: test.id,
                oldStatus: test.status,
                newStatus: status
            });

            return status;
        } catch (error) {
            console.error('Error processing payment notification:', {
                notification,
                error: error.message,
                stack: error.stack
            });
            throw error;
        }
    }

    determinePaymentStatus(transactionStatus, fraudStatus) {
        const statusMap = {
            capture: {
                challenge: 'PENDING',
                accept: 'PAID'
            },
            settlement: 'PAID',
            cancel: 'FAILED',
            deny: 'FAILED',
            expire: 'FAILED',
            pending: 'PENDING'
        };

        if (transactionStatus === 'capture') {
            return statusMap.capture[fraudStatus] || 'PENDING';
        }

        const status = statusMap[transactionStatus];
        if (!status) {
            throw new Error(`Unknown transaction status: ${transactionStatus}`);
        }

        return status;
    }

    async updateTestStatus(testId, status) {
        try {
            const validStatuses = ['PENDING', 'PAID', 'FAILED'];
            if (!validStatuses.includes(status)) {
                throw new Error(`Invalid status: ${status}`);
            }

            await prisma.test.update({
                where: { id: testId },
                data: { status },
            });

            console.log('Test status manually updated:', {
                testId,
                newStatus: status
            });
        } catch (error) {
            console.error('Error updating test status:', {
                testId,
                status,
                error: error.message
            });
            throw error;
        }
    }
}

export default new PaymentService();