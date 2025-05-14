const express = require('express');
const router = express.Router();
const { IsAdmin } = require('../Middleware/Auth.Middleware');
const { Upload } = require('../Config/Multer');

const {
  addProducts,
  updateProducts,
  DelateProducts,
  products,
  productsById,
  changeStock
} = require('../controllers/Products.Controller');

// Add new product
router.post("/addProducts", Upload.array("images"), IsAdmin, addProducts);

// Update product (with image replacement)
router.put("/updateProducts/:id", Upload.array("images"), IsAdmin, updateProducts);

// Delete product
router.delete("/delateProducts/:id", IsAdmin, DelateProducts);

// Get all products
router.get("/products", products);

// Get product by ID
router.get("/products/:id", productsById);

// Change stock status
router.patch("/changeStock", IsAdmin, changeStock);

module.exports = router;
