import express from 'express';
import { registerUser, loginUser, logoutUser, verifiedUser } from '../controllers/Auth.Controller.js';
import { authMiddleware } from '../Middleware/Auth.Middleware.js';
import { validregister, validlogin } from '../Middleware/validregister.js';

const router = express.Router();

router.post('/register', validregister, registerUser);
router.post('/login', validlogin, loginUser);
router.get('/logout', logoutUser);
router.get('/check-auth', authMiddleware, verifiedUser);

export default router;
