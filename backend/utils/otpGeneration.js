import crypto from 'crypto';

export const generateLongSecureOTP = async () => {
    return crypto.randomInt(100000, 1000000).toString(); // Generates a 6-digit OTP number 
};
export const generateOtpExpiry = async () => {
    const currentTime = new Date();
    return new Date(currentTime.getTime() + 13 * 60000); // Generates a 10-minute expiry time // 3 minutes for server side probable delay
};
