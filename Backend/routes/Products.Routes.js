import express from 'express';
import { IsAdmin } from '../Middleware/Auth.Middleware.js';
import { Upload } from '../Config/Multer.js';
import { addProducts, updateProducts, DeleteProducts, products, productsById, changeStock } from '../controllers/Products.Controller.js';

const router = express.Router();

// Add new product
router.post("/addProducts", Upload.array("files"), IsAdmin, addProducts);

// Update product (with image replacement)
router.put("/updateProducts/:id", Upload.array("files"), IsAdmin, updateProducts);

// Delete product
router.delete("/delateProducts/:id", IsAdmin, DeleteProducts);

// Get all products
router.get("/", products);

// Get product by ID
router.get("/:id", productsById);

// Change stock status
router.patch("/changeStock/:id/:inStock", IsAdmin, changeStock);

export default router;