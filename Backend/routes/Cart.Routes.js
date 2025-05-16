import express from "express";
import { authMiddleware } from './../Middleware/Auth.Middleware.js';
import { UpdateCart } from "../controllers/Cart.Controller.js";

const router = express.Router();

router.post("/updateCart", authMiddleware, UpdateCart);

export default router;
