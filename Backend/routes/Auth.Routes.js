const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, verifiedUser } = require('../controllers/Auth.Controller');
const { authMiddleware } = require('../Middleware/Auth.Middleware');
const { validregister, validlogin } = require('../Middleware/validregister');

router.post('/register', validregister, registerUser);
router.post('/login', validlogin, loginUser);
router.get('/logout', logoutUser);
router.get('/check-auth', authMiddleware, verifiedUser);




module.exports = router;