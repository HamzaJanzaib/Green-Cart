import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  offerPrice: {
    type: Number,
    default: null,
  },
  image: {
    type: [String],
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  inStock: {
    type: Boolean,
    default: true,
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

export default Product;
