const location = require('../Models/Location');

exports.getAllLocations = async (req,res) =>{
    try {
        const locationData = await location.find().exec();
        res.json(locationData);
    } catch (error) {
        res.status(500).json({error:"An error"});
    }
    
}