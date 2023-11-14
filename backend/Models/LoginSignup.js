const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv')

dotenv.config()

const loginSchema = new mongoose.Schema({
    Name:{type : String, required : true},
    email:{type : String, required: true},
    phoneNo:{type: String, required:true},
    address: {type: String, required: true},
    password:{type: String, required: true}
});

loginSchema.pre('save' , async function (next){
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error);
    }
})

const User = mongoose.model('user', loginSchema, 'user');
module.exports = User;