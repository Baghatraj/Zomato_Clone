const restaurant = require('../Models/Restaurant');
const menu = require('../Models/Menu')

exports.getAllRestaurants = async (req,res) =>{
    try {
        const restaurantData = await restaurant.find().exec();
        res.json(restaurantData);
    } catch (error) {
        res.status(500).json({error:"An error"});
    }
    
}

exports.getAllRestaurantsByLocation = async (req,res) =>{
    const city = req.params.city;

    try {
        const restaurantLocation = await restaurant.find({city: city});

        if (restaurantLocation.length === 0){
            res.status(404).json({error:"No city found"})
        }else{
            res.json(restaurantLocation);
        }
    } catch(error){
        res.status(500).json({error:"an error"});
    }
}

exports.getAllRestaurantsByQuery = async (req,res) =>{
    try{
        const {mealtype_id, city, cuisine, min_price, sort, location_id} = req.query;
        const query = {};
        if(city) query.city = city;
        if(mealtype_id) query.mealtype_id = Number(mealtype_id);
        if(location_id) query.location_id = Number(location_id);
        if (cuisine) {
            query.cuisine =  { $elemMatch: { name: cuisine } };
        }
        
        if(min_price){
            query.min_price= {$gte : Number(min_price)};
        }

        const sortOptions = {};
        if(sort){
            sortOptions[sort] = 1;
        }

        const restaurants = await restaurant.find(query).sort(sortOptions).exec();

        res.json(restaurants);
    } catch (error){
        console.log(error);
        res.status(500).json({error:error});
    }
}

exports.getAllRestaurantsByLid = async (req,res) =>{
    const location_id = req.params.location_id;

    try {
        const restaurantName = await restaurant.find({location_id: Number(location_id)});

        if (restaurantName.length === 0){
            res.status(404).json({error:"No city found"})
        }else{
            res.json(restaurantName);
        }
    } catch(error){
        res.status(500).json({error:"an error"});
    }
}

exports.getAllRestaurantsByName= async (req,res) =>{
    const name = req.params.name;

    try {
        const restaurantName = await restaurant.find({name: name});

        if (restaurantName.length === 0){
            res.status(404).json({error:"No city found"})
        }else{
            res.json(restaurantName);
        }
    } catch(error){
        res.status(500).json({error:"an error"});
    }
}

exports.filter = async (req,res) =>{
    try {
        const {location_id, mealtype_id, cuisine_id, sort, lcost, hcost} =  req.body
        const query = {}


        if(location_id) query.location_id = location_id
        if(mealtype_id) query.mealtype_id = mealtype_id
        if(cuisine_id && cuisine_id.length > 0){
            query.cuisine = { $elemMatch: { id: {$in : cuisine_id} } };
        } 

        if(lcost!== undefined && hcost!== undefined){
            query.min_price = {$lte : hcost, $gte : lcost}
        }

        const sortOptions = {};
        if(sort){
            sortOptions.min_price = sort
        }
        const restaurantName = await restaurant.find(query).sort(sortOptions).exec()

        if(restaurantName.length === 0){
            res.json({msg : "no city found"})
        }else{
            res.json(restaurantName)
        }

    }
    catch(err){
        res.status(500).json({msg : err})
    }
}


exports.menu = async (req,res) => {
    const resName = req.params.name

    try {
        const restaurant = await menu.find({name : resName})
        if(restaurant){
            return res.status(200).json(restaurant)
        }else{
            res.json({msg : "no res found"})
        }
    } catch (error) {
        res.status(500).json({err : error})
    }
}