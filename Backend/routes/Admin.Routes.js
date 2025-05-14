import express from 'express';
import { adminLogin, logoutAdmin, verifiedAdmin } from '../controllers/Auth.Controller';
import { validlogin } from '../Middleware/validregister';
import { IsAdmin } from '../Middleware/Auth.Middleware';

const router = express.Router();

router.post('/login', validlogin, adminLogin);
router.get('/check-auth', IsAdmin, verifiedAdmin);
router.get('/logout', logoutAdmin);

export default router;
