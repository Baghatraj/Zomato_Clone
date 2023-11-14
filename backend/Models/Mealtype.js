const mongoose = require('mongoose');
   
const mealtypeSchema = new mongoose.Schema({});
module.exports = mongoose.model('mealtype', mealtypeSchema, 'mealtype');