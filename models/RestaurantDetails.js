const mongoose = require('mongoose');

const RestaurantDetailsSchema = new mongoose.Schema({
    restaurantName: {
        type: String,
        required: true
    },
    restaurantAddress: {
        type: String,
        required: true,
        unique: true
    },
    restaurantImage: {
        type: String,
    },
    
});

module.exports = mongoose.model('RestaurantDetails', RestaurantDetailsSchema);
