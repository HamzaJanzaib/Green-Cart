const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        require: true
    },
    cartItems: {
        type: Object,
        default: {}
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, { minimize: false, timestamps: true });

module.exports = mongoose.model("User", UserSchema);