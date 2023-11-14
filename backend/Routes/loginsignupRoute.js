const express = require('express');
const router = express.Router();
const LoginSignup = require('../Controllers/loginsignupController');
const authMiddleware = require('../Middleware/auth')

router.post('/register', LoginSignup.register);
router.post('/login', LoginSignup.login);
router.get('/auth', authMiddleware, LoginSignup.auth)

module.exports = router;