import mongoose from 'mongoose';
import { user_model } from './models/user.model.js';
import { ApiResponse } from './utils/ApiResponse.js';
import { ApiError } from './utils/ApiError.js';

// New face-related helpers and endpoints
const validateFaceDescriptorstructure = (descriptor) => {
    if (!Array.isArray(descriptor)) return false;
    if (descriptor.length < 8) return false; // require at least some dimensions
    return descriptor.every((v) => typeof v === 'number' && Number.isFinite(v));
};

// Upload or update face data for a user
const upload_face = async (req, res) => {   // Test done
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const body = req.body;
        let { email, face_descriptor, face_image } = body;
        if (!email) throw new ApiError(400, 'Email is required');
        email = email.toLowerCase();

        if (!validateFaceDescriptorstructure(face_descriptor)) {
            throw new ApiError(400, 'Invalid face descriptor');
        }
        if (!face_image || typeof face_image !== 'string') {
            throw new ApiError(400, 'face_image (base64 or URL) is required');
        }

        const user = await user_model.findOne({ email }).session(session);
        if (!user) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json(new ApiError(404, { message: 'User not found' }, 'User not found'));
        }

        await user.updateOne({ face_descriptor, face_image, face_verified: false }, { session });
        await session.commitTransaction();
        session.endSession();

        const user2 = await user_model.findOne({ email }).select('-password -email_verified -__v');
        return res.status(200).json(
            new ApiResponse(200, {
                user: user2,
                message: 'Face data uploaded'
            }, 'Face data uploaded')
        );
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(new ApiError(500, { message: 'Internal Server Error', error: err.message }, 'Internal Server Error'));
    }
};
// Get face info for a user (face_image + face_verified)
const get_face = async (req, res) => {      // Test done
    try {
        let { email } = req.body;
        if (!email) throw new ApiError(400, 'Email is required');
        email = email.toLowerCase();
        console.log("get_face called for email:", email);

        const user = await user_model.findOne({ email }).select('face_image face_verified face_descriptor');
        if (!user) {
            return res.status(404).json(new ApiError(404, { message: 'User not found' }, 'User not found'));
        }
        if (!user.face_image || user.face_descriptor.length === 0) {
            return res.status(404).json(new ApiError(404, { message: 'Face data not found' }, 'Face data not found'));
        }
        return res.status(200).json(new ApiResponse(200, { face_image: user.face_image, face_verified: user.face_verified, face_descriptor: user.face_descriptor }, 'Face info retrieved'));
    } catch (err) {
        return res.status(500).json(new ApiError(500, { message: 'Internal Server Error', error: err.message }, 'Internal Server Error'));
    }
};
// Verify a user's face as admin will do the matching and set face_verified
const verify_face = async (req, res) => {   // Test done
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const body = req.body;
        let { email, to_verify_email, verify } = body;
        if (!email) {
            throw new ApiError(400, 'Email is required');
        }
        if (!to_verify_email) {
            throw new ApiError(400, 'to_verify_email is required');
        }
        if (typeof verify !== 'boolean') {
            throw new ApiError(400, 'verify (boolean) is required');
        }

        const user = await user_model.findOne({ email }).session(session);
        const user_to_verify = await user_model.findOne({ email: to_verify_email }).session(session);
        if (!user || !user_to_verify) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json(new ApiError(404, { message: 'User not found' }, 'User not found'));
        } else {
            if (user.role == 'faculty' || user.role == 'admin') {
                if (verify === false) {
                    // If marking as unverified, just update directly
                    await user_to_verify.updateOne({ face_image: "", face_descriptor: [], face_verified: false }, { session });
                    await session.commitTransaction();
                    session.endSession();
                    return res.status(200).json(new ApiResponse(200, { message: 'Face verification Rejected' }, 'Face verification Rejected'));
                } else {
                    await user_to_verify.updateOne({ face_verified: verify }, { session });
                    await session.commitTransaction();
                    session.endSession();
                    return res.status(200).json(new ApiResponse(200, { message: 'Face verification Done' }, 'Face verification Done'));
                }
            } else {
                await session.abortTransaction();
                session.endSession();
                return res.status(403).json(new ApiError(403, { message: 'User role not permitted for face verification' }, 'User role not permitted'));
            }
        }
    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        return res.status(500).json(new ApiError(500, { message: 'Internal Server Error', error: err.message }, 'Internal Server Error'));
    }
};
const get_unverified_users = async (req, res) => {  // Test done
    try {
        const body = req.body;
        let { page, page_limit } = body; // page = page number, page_limit = items per page

        page = Math.max(1, parseInt(page, 10) || 1);
        page_limit = Math.min(100, Math.max(1, parseInt(page_limit, 10) || 5)); // cap at 100, default 5

        const total = await user_model.countDocuments({ face_verified: false });
        const totalPages = Math.ceil(total / page_limit);

        // Select safe fields only (avoid exposing password or tokens)
        const users = await user_model
            .find({ face_verified: false })
            .select('email first_name last_name role face_image face_verified face_descriptor')
            .skip((page - 1) * page_limit)
            .limit(page_limit)

        return res.status(200).json(new ApiResponse(200, {
            "unverified_users": total, // Total unverified users
            "total_pages": totalPages,
            "current_page": page,
            "page_limit": page_limit,
            "users": users
        }, 'Unverified users retrieved'));
    } catch (err) {
        return res.status(500).json(new ApiError(500, { message: 'Internal Server Error', error: err.message }, 'Internal Server Error'));
    }
};

export {
    upload_face,
    get_face,
    verify_face,
    get_unverified_users
};