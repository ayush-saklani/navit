import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true, // Use SSL
    port: 465,    // Gmail SSL port 
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendMail = async (to, subject, content) => {
    try {
        await transporter.sendMail({
            from: `"Navit" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html: content, // Use 'html' instead of 'text' for rich formatting
        });
        console.log("Email sent successfully");
        return "Email sent successfully";
    } catch (error) {
        console.error("Error sending mail:", error);
        return "Failed to send email. Please try again later.";
    }
};

export const sendotp = async (to, otp, expiryTime = '10', name = 'User') => {
    console.log("Sending OTP to", to);
    const subject = 'Your OTP for Navit Verification';
    const html = `
    <body style="margin: 10px; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"
            style="background-color: #ffffff; max-width: 600px; margin: 20px auto; padding: 20px; border-radius: 10px; box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);">
            <tr>
                <td style="text-align: center; ">
                    <img src="https://navit.vercel.app/assets/logo-Cuayozfd.png" alt="Grow to Viral" width="150"
                        style="margin-bottom: 10px;">
                    <h1 style="color: #333;">Welcome to Navit</h1>
                    <h3 style="color: #333;">Hello ${name},</h3>
                </td>
            </tr>

            <tr>
                <td style="padding: 10px; text-align: center; color: #555;">
                    <p>Your OTP for <strong>Navit Verification</strong> is:</p>
                    <h1 style="font-weight: 700; color: #1d62c2;">${otp}</h1>
                    <p>This OTP is valid for <strong>${expiryTime} minutes</strong>. Please use this
                        code to complete your verification process.</p>
                    <p>If you did not request this email, please ignore it.</p>
                </td>
            </tr>
            <tr>
                <td style="padding: 20px; text-align: center; font-size: 14px; color: #777;">
                    <p>Need help? Reach out to me 
                        <a href="https://www.linkedin.com/in/ayush-saklani/" style="color: #1d62c2; text-decoration: none;"
                            target="_blank">linkedin</a>
                        or Github issues.
                    </p>
                    <p>Follow us for updates:</p>
                    <p>
                        <a href="https://github.com/ayush-saklani" style="margin: 0 5px; text-decoration: none; color: #1d62c2;"
                            target="_blank">Github</a> |
                        <a href="https://www.linkedin.com/in/ayush-saklani/"
                            style="margin: 0 5px; text-decoration: none; color: #1d62c2;" target="_blank">LinkedIn</a>
                    </p>
                </td>
            </tr>
        </table>
    </body>
    `;
    await sendMail(to, subject, html);
}