
// Controller For Addproducts
const Product = require('../models/Product');
const Category = require('../models/Category');

// Controller For Add Products
module.exports.addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      offerPrice,
      image,
      category,
      inStock
    } = req.body;

    // Find the category by its name
    const foundCategory = await Category.findOne({ text: category });

    if (!foundCategory) {
      return res.status(400).json({
        success: false,
        message: `Category '${category}' not found`
      });
    }

    // Create new product with the category _id
    const product = new Product({
      name,
      description,
      price,
      offerPrice,
      image,
      category: foundCategory._id,
      inStock
    });

    const savedProduct = await product.save();

    res.status(201).json({
      success: true,
      message: 'Product added successfully',
      data: savedProduct
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add product',
      error: error.message
    });
  }
};

// ----------------------- Controller For Addproducts end

// Controller For products
module.exports.products = async () => {

}
// ----------------------- Controller For products end

// Controller For productsById
module.exports.productsById = async () => {

}
// ----------------------- Controller For productsById end

// Controller For changeStock
module.exports.changeStock = async () => {

}
// ----------------------- Controller For changeStock end

// Controller For updateProducts
module.exports.updateProducts = async () => {

}
// ----------------------- Controller For updateProducts end