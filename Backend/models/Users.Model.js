import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    cartItems: {
        type: Object,
        default: {},
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    }
}, { minimize: false, timestamps: true });

export default mongoose.model('User', UserSchema);
