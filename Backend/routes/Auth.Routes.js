const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser, verifiedUser } = require('../controllers/Auth.Controller');
const { authMiddleware } = require('../Middleware/Auth.Middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/check-auth', authMiddleware, verifiedUser);




module.exports = router;