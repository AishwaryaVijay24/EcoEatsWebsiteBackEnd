const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  itemPrice: {
    type: Number,
    required: true
  },
  itemCategory: {
    type: String,
    required: true
  },
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RestaurantDetails', // Reference to the RestaurantDetails model
    required: [true, "Please provide rest id"]
}
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;