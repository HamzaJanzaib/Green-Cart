const Cloudinary = require('cloudinary').v2;
const { extractPublicId } = require('../Config/Helper');
// Controller For Addproducts
const {ProductModel , CategoryModel} = require('../models/Index');

// Controller For Add Products
module.exports.addProducts = async (req, res) => {
  try {
    const productsData = JSON.parse(req.body.productsData);
    const images = req.files;

    // Upload images to Cloudinary and collect secure URLs
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await Cloudinary.uploader.upload(item.path, {
          resource_type: 'image'
        });
        return result.secure_url;
      })
    );

    // Find the category by its name
    const foundCategory = await CategoryModel.findOne({ text: productsData.category });

    if (!foundCategory) {
      return res.status(400).json({
        success: false,
        message: `Category '${productsData.category}' not found`
      });
    }

    // Create and save the product with all data
    const product = new ProductModel({
      name: productsData.name,
      description: productsData.description,
      price: productsData.price,
      offerPrice: productsData.offerPrice,
      image: imagesUrl, // Array of URLs
      category: foundCategory._id,
      inStock: productsData.inStock
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

// -------------------------------------------------------------------------------

// Controller For products
module.exports.products = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await ProductModel.find().populate('category', 'text'); // Populate category name

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      data: products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch products',
      error: error.message,
    });
  }
};
// ----------------------- Controller For products end

// -------------------------------------------------------------------------------


// Controller For productsById
module.exports.productsById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id).populate('category', 'text');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product,
    });
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch product',
      error: error.message,
    });
  }
};
// ----------------------- Controller For productsById end

// -------------------------------------------------------------------------------

// Controller For changeStock
module.exports.changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    // Validate input
    if (typeof inStock !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: '`inStock` must be a boolean value',
      });
    }

    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Stock status updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating stock:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update stock',
      error: error.message,
    });
  }
};
// ----------------------- Controller For changeStock end

// -------------------------------------------------------------------------------

// Controller For updateProducts
module.exports.updateProducts = async (req, res) => {
  try {
    const { id, name, description, price, offerPrice, category, inStock } = req.body;
    const newImages = req.files;

    const existingProduct = await ProductModel.findById(id);

    if (!existingProduct) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete old images from Cloudinary
    if (existingProduct.image && existingProduct.image.length > 0) {
      await Promise.all(
        existingProduct.image.map(async (url) => {
          const publicId = extractPublicId(url);
          if (publicId) {
            await Cloudinary.uploader.destroy(publicId);
          }
        })
      );
    }

    // Upload new images to Cloudinary
    let imageUrls = [];
    if (newImages && newImages.length > 0) {
      imageUrls = await Promise.all(
        newImages.map(async (file) => {
          const result = await Cloudinary.uploader.upload(file.path, {
            resource_type: 'image',
          });
          return result.secure_url;
        })
      );
    }

    // Resolve category ID if needed
    let categoryId = category;
    if (typeof category === 'string') {
      const foundCategory = await CategoryModel.findOne({ text: category });
      if (!foundCategory) {
        return res.status(400).json({
          success: false,
          message: `Category '${category}' not found`,
        });
      }
      categoryId = foundCategory._id;
    }

    // Update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        name,
        description,
        price,
        offerPrice,
        image: imageUrls,
        category: categoryId,
        inStock,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update product',
      error: error.message,
    });
  }
};
// ----------------------- Controller For updateProducts end

// -------------------------------------------------------------------------------


// Controller For DeleteProducts
module.exports.DelateProducts = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductModel.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Delete product images from Cloudinary
    if (product.image && product.image.length > 0) {
      await Promise.all(
        product.image.map(async (url) => {
          const publicId = extractPublicId(url);
          if (publicId) {
            await Cloudinary.uploader.destroy(publicId);
          }
        })
      );
    }

    // Delete product from database
    await ProductModel.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete product',
      error: error.message,
    });
  }
};
// ----------------------- Controller For DeleteProducts end