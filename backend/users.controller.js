import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { user_model } from './models/user.model.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';
import { generateLongSecureOTP, generateOtpExpiry } from './utils/otpGeneration.js';
import { sendotp } from './utils/nodemailer.js';

const validateEmailstructure = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gehu|geu)\.ac\.in$/;
    return emailRegex.test(email);
};
const validatePasswordstructure = (password) => {
    return password.length >= 6;
};
const validateOTPstructure = (otp) => {
    return otp.length === 6;
}

const signup = async (req, res) => { // verified and working
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('Unkown error occured');
        }

        const body = req.body; // Parse the request body
        const { first_name, last_name, password } = body;
        let { email } = body;
        console.log(req.query);
        console.log(first_name, last_name, email, password);
        email = email.toLowerCase();

        if (!validatePasswordstructure(password)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Password must be at least 6 characters long'
                }, 'Password must be at least 6 characters long')
            );
        }

        if (!validateEmailstructure(email)) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Invalid email format'
                }, 'Invalid email format')
            );
        }

        const existinguser = await user_model.findOne({ email: email });
        if (existinguser) {
            if (existinguser.email_verified) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json(
                    new ApiError(400, {
                        message: 'user already exists'
                    }, 'user already exists')
                );
            }
            const otp = await generateLongSecureOTP();
            const otpExpiry = await generateOtpExpiry();
            await existinguser.updateOne({ otp, otpExpiry }, { session: session });
            await session.commitTransaction();
            session.endSession();
            const response = await sendotp(email, otp, "10", existinguser.first_name);

            return res.status(200).json(
                new ApiResponse(200, {
                    response,
                }, 'User already exists. OTP sent to Email.')
            );
        } else {
            console.log("signup");

            const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 rounds of salt
            const otp = await generateLongSecureOTP();
            const otpExpiry = await generateOtpExpiry();
            const user = new user_model({
                first_name,
                last_name,
                email,
                password: hashedPassword.toString(),
                otp,
                otpExpiry
            });
            await user.save({ session: session });
            const userId = user._id;
            const token = jwt.sign({ userId }, secretKey);
            await session.commitTransaction();
            session.endSession();

            const response = await sendotp(email, otp, "10", user.first_name);

            return res.status(201).json(
                new ApiResponse(201, {
                    response,
                    token,
                }, 'user created, Email not verified')
            );
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
};
const verifyotp = async (req, res) => { // verified and working
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const body = req.body; // Parse the request body
        const { otp } = body;
        let { email } = body;
        email = email.toLowerCase();
        const user = await user_model.findOne({ email: email, otp: otp });
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Invalid OTP'
                }, 'Invalid OTP')
            );
        }
        const currentTime = new Date();
        const validTime = new Date(user.otpExpiry);
        if (validTime < currentTime) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'OTP expired'
                }, 'OTP expired')
            );
        }
        await user.updateOne({ $unset: { otp: "", otpExpiry: "" } }, { session });
        await user.updateOne({ email_verified: true }, { session });
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(
            new ApiResponse(200, {
                message: 'OTP verified successfully'
            }, 'OTP verified successfully')
        );

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
}
const signin = async (req, res) => { // verified and working
    try {
        const body = req.body;
        const { password } = body;
        let { email } = body;
        email = email.toLowerCase();
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            throw new ApiError(400, 'Invalid email format');
        }
        if (!password || typeof password !== 'string' || password.length < 6) {
            throw new ApiError(400, 'Password must be at least 6 characters long');
        }

        const existingUser = await user_model.findOne({ email });
        if (!existingUser) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'User not found'
                }, 'User not found')
            );
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Invalid password'
                }, 'Invalid password')
            );
        }

        const userId = existingUser._id;
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }
        const token = jwt.sign({ userId }, secretKey);
        const user = await user_model.findOne({ email }).select('-password -email_verified -__v');
        return res.status(200).json(
            new ApiResponse(200, {
                token,
                user,
            }, 'User signed in successfully')
        );

    } catch (error) {
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
}
const resendotp = async (req, res) => { // verified and working
    try {
        const body = req.body;
        let { email } = body;
        email = email.toLowerCase();

        const user = await user_model.findOne({ email: email });
        if (!user) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'User does not exist'
                }, 'User does not exist')
            );
        }
        const otp = await generateLongSecureOTP();
        const otpExpiry = await generateOtpExpiry();
        await user.updateOne({ otp, otpExpiry });

        const response = await sendotp(email, otp, "10", user.first_name);


        return res.status(200).json(
            new ApiResponse(200, {
                message: 'OTP sent successfully',
                data: response
            }, 'OTP sent successfully')
        );

    } catch (error) {
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
}
const resetpassword = async (req, res) => { // verified and working
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }
        const body = req.body; // Parse the request body
        let email = body.email;
        email = email.toLowerCase();

        if (!validateEmailstructure(email)) {
            throw new ApiError(400, 'Invalid email format');
        }

        const existinguser = await user_model.findOne({ email: email });
        if (!existinguser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'User does not exist'
                }, 'User does not exist')
            );
        }
        else {
            const otp = await generateLongSecureOTP();
            const otpExpiry = await generateOtpExpiry();
            const user = await user_model.findOneAndUpdate({ email: email }, { otp: otp, otpExpiry: otpExpiry }, { session: session, new: true });
            await session.commitTransaction();
            session.endSession();
            const response = await sendotp(email, otp, "10", user.first_name);

            return res.status(200).json(
                new ApiResponse(200, {
                    message: 'OTP sent successfully',
                    data: response
                }, 'OTP sent successfully')
            );

        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
};
const resetpasswordverify = async (req, res) => {   // verified and working
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('JWT_SECRET_KEY is not defined');
        }

        const body = req.body; // Parse the request body
        let { email } = body;
        const { password, otp } = body;

        email = email.toLowerCase();

        if (!validateOTPstructure(otp)) {
            throw new ApiError(400, 'Invalid OTP format');
        }
        if (!validatePasswordstructure(password)) {
            throw new ApiError(400, 'Password must be at least 6 characters long ');
        }
        if (!validateEmailstructure(email)) {
            throw new ApiError(400, 'Invalid email format');
        }

        const user = await user_model.findOne({ email: email, otp: otp });
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Invalid OTP'
                }, 'Invalid OTP')
            );
        }
        const currentTime = new Date();
        const validTime = new Date(user.otpExpiry);
        if (validTime < currentTime) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'OTP expired'
                }, 'OTP expired')
            );
        }
        await user.updateOne({ $unset: { otp: "", otpExpiry: "" } }, { session: session });
        await user.updateOne({ email_verified: true }, { session: session });
        const hashedPassword = await bcrypt.hash(password, 10); // Hash the password with 10 rounds of salt
        await user.updateOne({ password: hashedPassword.toString() }, { session: session });
        await session.commitTransaction();
        session.endSession();
        return res.status(200).json(
            new ApiResponse(200, {
                message: 'Password reset successfully'
            }, 'Password reset successfully')
        );
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
}
const update_course_info = async (req, res) => { // verified and working
    try {
        const body = req.body;
        const { password, course, semester, section } = body;
        let { email } = body;
        email = email.toLowerCase();
        if (!email || typeof email !== 'string' || !email.includes('@')) {
            throw new ApiError(400, 'Invalid email format');
        }

        const existingUser = await user_model.findOne({ email });
        if (!existingUser) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'User not found'
                }, 'User not found')
            );
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Invalid password'
                }, 'Invalid password')
            );
        }
        if (!course || !semester || !section) {
            return res.status(400).json(
                new ApiError(400, {
                    message: 'Course, semester, and section are required'
                }, 'Course, semester, and section are required')
            );
        }
        await existingUser.updateOne({ course, semester, section });
        const user = await user_model.findOne({ email }).select('-password -email_verified -__v');
        return res.status(200).json(
            new ApiResponse(200, {
                user,
            }, 'User updated successfully')
        );

    } catch (error) {
        return res.status(500).json(
            new ApiError(500, {
                message: 'Internal Server Error',
                error: error
            }, 'Internal Server Error')
        );
    }
}
export { signup, verifyotp, signin, resendotp, resetpassword, resetpasswordverify, update_course_info };



// const mailtester = async (req, res) => {
//     try {
//         const email = '';// Enter your email here
//         const otp = '123456';
//         const response = await sendotp(email, otp, "10", 'Ayush');
//         console.log(email);
//         return res.status(200).json(
//             new ApiResponse(200, {
//                 response,
//             }, 'OTP sent successfully')
//         );

//     } catch (error) {
//         console.log(error);
//         return res.status(500).json(
//             new ApiError(500, {
//                 message: 'Internal Server Error',
//                 error: error
//             }, 'Internal Server Error')
//         );
//     }
// }
// export { mailtester };