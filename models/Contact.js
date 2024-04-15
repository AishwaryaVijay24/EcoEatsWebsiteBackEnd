const mongoose = require('mongoose');
//schema

const ContactSchema = new mongoose.Schema({
    contactName:{
        type:String,
        required:true
    },
    contactEmail:{
        type:String,
        required:true,
    },
    contactMessage:{
        type:String,
        required:true
    }
})

  
const ContactUs= mongoose.model('ContactUs',ContactSchema);
module.exports=ContactUs;