import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    email_verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    course: {
        type: String,
        required: false,
    },
    semester: {
        type: String,
        required: false,
    },
    section: {
        type: String,
        required: false,
    },
    otp: {
        type: String,
        required: false,
    },
    otpExpiry: {
        type: Date,
        required: false,
    },
    role: {
        type: String,
        enum: ['student', 'faculty', 'admin'],
        required: true,
        default: 'student',
    },
    profile_picture: {
        type: String,
        required: false,
        default: "https://placehold.co/200/EEE/31343C?font=montserrat&text=:)",
    }
})
const user_model = mongoose.models.users || mongoose.model('user', UserSchema);
export { user_model };