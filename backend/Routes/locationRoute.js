const express = require('express');
const router = express.Router();
const locationController = require('../Controllers/locationController');

router.get('/getAllLocations', locationController.getAllLocations);

module.exports = router;