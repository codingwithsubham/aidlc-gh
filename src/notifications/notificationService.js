const nodemailer = require('nodemailer');

class NotificationService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // replace with your email
                pass: 'your-email-password' // replace with your password
            }
        });
    }

    async sendEmail(to, subject, text) {
        const mailOptions = {
            from: 'your-email@gmail.com',
            to,
            subject,
            text
        };

        return this.transporter.sendMail(mailOptions);
    }

    notifyRegistrationVerification(user) {
        const subject = 'Verify Your Email';
        const text = `Please verify your registration by clicking here: http://example.com/verify?user=${user.id}`;
        return this.sendEmail(user.email, subject, text);
    }

    notifyOrderPlaced(order) {
        const subject = 'Order Confirmation';
        const text = `Your order ${order.id} has been placed successfully.`;
        return this.sendEmail(order.userEmail, subject, text);
    }

    notifyOrderShipped(order) {
        const subject = 'Your Order has Shipped';
        const text = `Your order ${order.id} has been shipped.`;
        return this.sendEmail(order.userEmail, subject, text);
    }

    // Add other notification methods as needed
}

module.exports = new NotificationService();