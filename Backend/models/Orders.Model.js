import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    address: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Address',
      required: true,
    },
    status: {
      type: String,
      enum: ['orderplaced', 'processing', 'delivered', 'cancelled'],
      default: 'orderplaced',
      required: true,
    },
    paymentType: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
    GrandTotal: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
