import express from 'express';
import { IsAdmin } from '../Middleware/Auth.Middleware.js';
import { Upload } from '../Config/Multer.js';
import { Addcategory, categorys, updatecategory, Delatecategory } from '../controllers/Category.Controller.js';

const router = express.Router();

// Add new category
router.post('/addCategory', Upload.single('image'), IsAdmin, Addcategory);

// Get all categories
router.get('/', categorys);

// Update category
router.put('/updateCategory/:id', Upload.single('image'), IsAdmin, updatecategory);

// Delete category
router.delete('/deleteCategory/:id', IsAdmin, Delatecategory);

export default router;
