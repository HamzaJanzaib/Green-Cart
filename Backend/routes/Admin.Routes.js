const express = require('express');
const router = express.Router();
const { adminLogin, logoutAdmin , verifiedAdmin } = require('../controllers/Auth.Controller');
const { validlogin } = require('../Middleware/validregister');
const { IsAdmin } = require('../Middleware/Auth.Middleware');

router.post('/login', validlogin, adminLogin);
router.get('/check-auth', IsAdmin, verifiedAdmin);
router.get('/logout', logoutAdmin);




module.exports = router;
