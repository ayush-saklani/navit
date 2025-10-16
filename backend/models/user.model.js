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
    },
    // Security & Identity for Face Recognition (attendance project uses this authentication)
    face_descriptor: {
        type: [Number], // face-api.js numeric embedding array
        required: true,
        default: [],
    },
    face_image: {
        type: String,
        required: true,
        default: "",
    },
    face_verified: {
        type: Boolean,
        required: true,
        default: false,
    },
    last_login_ip: {
        type: String,
        required: false,
        default: "",
    }
}, { timestamps: true })
const user_model = mongoose.models.users || mongoose.model('user', UserSchema);
export { user_model };