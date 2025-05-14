const express = require('express');
const router = express.Router();
const { IsAdmin } = require('../Middleware/Auth.Middleware');
const { Upload } = require('../Config/Multer');

const {
  Addcategory,
  categorys,
  updatecategory,
  Delatecategory
} = require('../controllers/Category.Controller');

// Add new category
router.post('/addCategory', Upload.single('image'), IsAdmin, Addcategory);

// Get all categories
router.get('/categories', categorys );

// Update category
router.put('/updateCategory/:id', Upload.single('image'), IsAdmin, updatecategory);

// Delete category
router.delete('/deleteCategory/:id', IsAdmin, Delatecategory);

module.exports = router;
