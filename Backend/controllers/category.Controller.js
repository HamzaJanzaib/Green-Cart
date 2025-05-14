const { CategoryModel } = require('../models/Index');
const Cloudinary = require('cloudinary').v2;

// Controller For category
module.exports.categorys = async () => {

}
// ----------------------- Controller For categorys end

// Controller For Addcategorys

module.exports.Addcategory = async (req, res) => {
    try {
        const { text, path, bgColor } = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({
                success: false,
                message: 'Image file is required',
            });
        }

        // Upload image to Cloudinary
        const result = await Cloudinary.uploader.upload(imageFile.path, {
            resource_type: 'image',
        });

        // Create and save category
        const category = new CategoryModel({
            text,
            path,
            bgColor,
            image: result.secure_url,
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
module.exports.Delatecategory = async () => {

}
// ----------------------- Controller For Delatecategory end

// Controller For updatecategory
module.exports.updatecategory = async () => {

}
// ----------------------- Controller For updatecategory end