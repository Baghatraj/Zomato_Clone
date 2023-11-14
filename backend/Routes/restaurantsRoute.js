const express = require('express');
const router = express.Router();
const restaurantController = require('../Controllers/restaurantController');
// const { route } = require('./locationRoute');

router.get('/getAllRestaurants', restaurantController.getAllRestaurants);
router.get('/getAllRestaurantsByLocation/:city', restaurantController.getAllRestaurantsByLocation);
router.get('/getAllRestaurantsByQuery', restaurantController.getAllRestaurantsByQuery);
router.get('/getAllRestaurantsByLid/:location_id', restaurantController.getAllRestaurantsByLid);
router.get('/getAllRestaurantsByName/:name', restaurantController.getAllRestaurantsByName);
router.post('/filter', restaurantController.filter);
router.get('/menu/:name', restaurantController.menu);

module.exports = router;