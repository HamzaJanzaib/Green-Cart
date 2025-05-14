import { CategoryModel } from '../models/Index.js';
import { v2 as Cloudinary } from 'cloudinary';  // ESM import for Cloudinary v2

// Controller For category
export const categorys = async (req, res) => {
    try {
        const categories = await CategoryModel.find();

        if (!categories || categories.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No categories found',
            });
        }
        res.status(200).json({
            success: true,
            message: 'Categories fetched successfully',
            data: categories,
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch categories',
            error: error.message,
        });
    }
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
export const Delatecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCategory = await CategoryModel.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        res.status(200).json({
            success: true,
            message: `Category '${deletedCategory.text}' deleted successfully`,
            data: deletedCategory,
        });
    } catch (error) {
        console.error('Error deleting category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete category',
            error: error.message,
        });
    }
};
// ----------------------- Controller For Delatecategory end

// Controller For updatecategory
export const updatecategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { text, path, bgColor } = req.body;
        const imageFile = req.file;
        const existingCategory = await CategoryModel.findById(id);

        if (!existingCategory) {
            return res.status(404).json({
                success: false,
                message: 'Category not found',
            });
        }
        let imageUrl = existingCategory.image;

        // If a new image is uploaded, update it
        if (imageFile) {
            const result = await Cloudinary.uploader.upload(imageFile.path, {
                resource_type: 'image',
            });
            imageUrl = result.secure_url;
        }

        // Update the category fields
        existingCategory.text = text || existingCategory.text;
        existingCategory.path = path || existingCategory.path;
        existingCategory.bgColor = bgColor || existingCategory.bgColor;
        existingCategory.image = imageUrl;

        const updatedCategory = await existingCategory.save();

        res.status(200).json({
            success: true,
            message: `Category '${updatedCategory.text}' updated successfully`,
            data: updatedCategory,
        });
    } catch (error) {
        console.error('Error updating category:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update category',
            error: error.message,
        });
    }
};
// ----------------------- Controller For updatecategory end
