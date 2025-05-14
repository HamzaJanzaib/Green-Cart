import express from 'express';
import { adminLogin, logoutAdmin, verifiedAdmin } from '../controllers/Auth.Controller.js';
import { validlogin } from '../Middleware/validregister.js';
import { IsAdmin } from '../Middleware/Auth.Middleware.js';

const router = express.Router();

router.post('/login', validlogin, adminLogin);
router.get('/check-auth', IsAdmin, verifiedAdmin);
router.get('/logout', logoutAdmin);

export default router;
