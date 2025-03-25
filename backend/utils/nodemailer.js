import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // Use SSL
    port: 465,    // Gmail SSL port 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});
export const sendMail = async (to, otp, expiryTime = '10', name) => {
    const subject = 'Your OTP for EAGG Verification';
    const text = `
        Dear ${name ? name : "User"},

        Your OTP for EAGG verification is ${otp}. Please use this code to complete the verification process. 
        This OTP is valid for ${expiryTime ? expiryTime : "10"} minutes.

        If you did not request this email, please ignore it.

        Best regards,
        The EAGG Team
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        return 'OTP sent successfully';
    } catch (error) {
        console.error('Error sending mail:', error.message);
        throw new Error('Failed to send OTP. Please try again later.');
    }
};
export const sendInvite = async (to, name) => {
    const subject = 'Your OTP for EAGG Verification';
    const text = `
        Dear ${name ? name : "User"},

        You have been added to EAGG as a player by the admin.
        We are excited to invite you to register and become a part of the EAGG community.

        Please use the link below to complete your sign-up and verification process:,

        Best regards,
        The EAGG Team
    `;

    try {
        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text
        });
        console.log(`Invite sent successfully to ${to}`);
    } catch (error) {
        console.error(`Failed to send invite to ${to}:`, error.message);
    }
};