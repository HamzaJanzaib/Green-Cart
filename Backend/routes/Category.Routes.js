import express from 'express';
import { IsAdmin } from '../Middleware/Auth.Middleware';
import { Upload } from '../Config/Multer';
import { Addcategory, categorys, updatecategory, Delatecategory } from '../controllers/Category.Controller';

const router = express.Router();

// Add new category
router.post('/addCategory', Upload.single('image'), IsAdmin, Addcategory);

// Get all categories
router.get('/categories', categorys);

// Update category
router.put('/updateCategory/:id', Upload.single('image'), IsAdmin, updatecategory);

// Delete category
router.delete('/deleteCategory/:id', IsAdmin, Delatecategory);

export default router;
