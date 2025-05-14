import express from 'express';
import {
    placeOrderCod,
    getUserOrders,
    getAllOrders,
} from '../controllers/Order.Controller.js';
import { authMiddleware, IsAdmin } from "../Middleware/Auth.Middleware.js"

const router = express.Router();

router.post('/place-order/COD', authMiddleware, placeOrderCod);

router.get('/:userId', authMiddleware, getUserOrders);

router.get('/admin/orders', IsAdmin, getAllOrders);

export default router;
