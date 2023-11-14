const mealtype = require('../Models/Mealtype');

exports.getAllMealtypes = async (req,res) =>{
    try {
        const mealtypeData = await mealtype.find().exec();
        res.json(mealtypeData);
    } catch (error) {
        res.status(500).json({error:"An error"});
    }
    
}