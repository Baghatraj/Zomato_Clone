const mongoose = require('mongoose');
   
const restaurantSchema = new mongoose.Schema({});
module.exports = mongoose.model('restaurant', restaurantSchema, 'restaurant');