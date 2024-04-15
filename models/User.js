const mongoose = require('mongoose');

//schema

const RegLoginSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    phoneNumber:{
        type:String,
        required:true,
        unique: true
    },
    countryCode:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
        unique: true
    }
})

  
  const User = mongoose.model('User', RegLoginSchema);

module.exports = User;
