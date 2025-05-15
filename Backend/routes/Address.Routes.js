import express from 'express';
import { addAddress, deleteAddress, getAddress, updateAddress } from '../controllers/Address.Controller.js'; // Adjust path based on your structure
import { authMiddleware } from './../Middleware/Auth.Middleware.js';

const router = express.Router();

router.post('/add',authMiddleware, addAddress);

router.get('/',authMiddleware, getAddress);

router.put('/update', authMiddleware , updateAddress);

router.delete('/:addressId', authMiddleware ,deleteAddress);


export default router;
