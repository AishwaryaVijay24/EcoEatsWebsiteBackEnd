const mongoose = require('mongoose');

//schema

const BusinessRegLoginSchema = new mongoose.Schema({
    Ownername:{
        type:String,
        required:true
    },
    Owneremail:{
        type:String,
        required:true,
        unique: true
    },
    Ownerphone:{
        type:String,
        required:true,
        unique: true
    },
    Ownerpassword:{
        type:String,
        required:true,
    },
    Ownercity:{
        type:String,
        required:true,
    },
})


const Business = mongoose.model('Business', BusinessRegLoginSchema);
module.exports = Business;
