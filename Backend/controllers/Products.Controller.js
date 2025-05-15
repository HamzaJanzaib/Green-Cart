import { v2 as Cloudinary } from 'cloudinary'; // Cloudinary v2 import for ESM
import { extractPublicId } from '../Config/Helper.js';
import { ProductModel, CategoryModel } from '../models/Index.js';
import fs from 'fs';

// Controller For Add Products
export const addProducts = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      offerPrice,
      category,
      inStock
    } = req.body;

    const images = req.files;
    console.log('Files received:', req.files);
    console.log('Body received:', req.body);

    // Validate required fields
    if (!name || !description || !price || !category || !images || !images.length) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields and at least one image.'
      });
    }

    // Upload images to Cloudinary and get URLs
    const imagesUrl = await Promise.all(
      images.map(async (item) => {
        const result = await Cloudinary.uploader.upload(item.path, {
          resource_type: 'auto'
        });

        // Delete local file after upload
        fs.unlink(item.path, () => { });
        return result.secure_url;
      })
    );

    // Find category by 'text' field matching frontend category string
    const foundCategory = await CategoryModel.findOne({ path: category });

    if (!foundCategory) {
      return res.status(400).json({
        success: false,
        message: `Category '${category}' not found`
      });
    }

    const product = new ProductModel({
      name,
      description,
      price: Number(price),
      offerPrice: offerPrice ? Number(offerPrice) : undefined,
      image: imagesUrl,
      category: foundCategory._id,
      inStock: inStock === 'true' || inStock === true,
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

// ----------------------- Controller For Add Products end

// -------------------------------------------------------------------------------

// Controller For Products
export const products = async (req, res) => {
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
// ----------------------- Controller For Products end

// -------------------------------------------------------------------------------

// Controller For Products By ID
export const productsById = async (req, res) => {
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
// ----------------------- Controller For Products By ID end

// -------------------------------------------------------------------------------

// Controller For Change Stock
export const changeStock = async (req, res) => {
  try {
    const { id } = req.params;
    let { inStock } = req.params;

    console.log('inStock (before conversion):', inStock);

    // Convert 'true'/'false' strings to boolean
    if (inStock === 'true') {
      inStock = true;
    } else if (inStock === 'false') {
      inStock = false;
    }

    console.log('inStock (after conversion):', inStock);

    // Validate if inStock is a boolean
    if (typeof inStock !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: '`inStock` must be a boolean value',
      });
    }

    // Update the stock status in the database
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


// ----------------------- Controller For Change Stock end

// -------------------------------------------------------------------------------

// Controller For Update Products
export const updateProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, offerPrice, category, inStock } = req.body;
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
// ----------------------- Controller For Update Products end

// -------------------------------------------------------------------------------

// Controller For DeleteProducts
export const DeleteProducts = async (req, res) => {
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
