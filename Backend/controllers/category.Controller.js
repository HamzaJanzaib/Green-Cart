import { CategoryModel } from '../models/Index.js';
import { v2 as Cloudinary } from 'cloudinary';  // ESM import for Cloudinary v2

// Controller For category
export const categorys = async () => {
    // Add implementation for fetching categories
};
// ----------------------- Controller For categorys end

// Controller For Addcategory
export const Addcategory = async (req, res) => {
    try {
        const { text, path, bgColor } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required',
            });
        }

        // Upload image to Cloudinary v2
        const result = await Cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image',
        });

        // Create and save category
        const category = new CategoryModel({
            text,
            path,
            bgColor,
            image: result.secure_url, // Use Cloudinary's secure URL for the image
        });

        const savedCategory = await category.save();

        res.status(201).json({
            success: true,
            message: 'Category added successfully',
            data: savedCategory,
        });
    } catch (error) {
        console.error('Error adding category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to add category',
            error: error.message,
        });
    }
};
// ----------------------- Controller For Addcategory end

// Controller For Delatecategory
export const Delatecategory = async () => {
    // Add implementation for deleting categories
};
// ----------------------- Controller For Delatecategory end

// Controller For updatecategory
export const updatecategory = async () => {
    // Add implementation for updating categories
};
// ----------------------- Controller For updatecategory end
