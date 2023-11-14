const express = require('express');
const router = express.Router();
const paymentController = require('../Controllers/paymentController')

router.post('/charge', paymentController.payments);

module.exports = router;