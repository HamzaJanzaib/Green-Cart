import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
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
    profilePicture: {
      type: String,
      default: 'https://avatar.iran.liara.run/public/boy',
    },
    cartItems: {
      type: Object,
      default: {},
    },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user',
    },
    addresses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address', 
      },
    ],
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order', 
      },
    ],
  },
  { minimize: false, timestamps: true }
);

export default mongoose.model('User', UserSchema);
