import express from 'express';
import { IsAdmin } from '../Middleware/Auth.Middleware';
import { Upload } from '../Config/Multer';
import { addProducts, updateProducts, DelateProducts, products, productsById, changeStock } from '../controllers/Products.Controller';

const router = express.Router();

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

export default router;
