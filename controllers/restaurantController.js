// controllers/restaurantController.js
const RestaurantDetails = require('../models/RestaurantDetails');

const createRestaurant = async (req, res) => {
    const { restaurantName, restaurantAddress, restaurantImage, } = req.body;

    try {
        // Create a new restaurant
        const newRestaurant = new RestaurantDetails({
            restaurantName,
            restaurantAddress,
            restaurantImage
        });

        // Save the restaurant to the database
        await newRestaurant.save();

        // Retrieve all restaurant details from the database
        const allRestaurantDetails = await RestaurantDetails.find({});

        // Send the response with all restaurant details
        res.status(201).json({ message: 'Restaurant created successfully', allRestaurantDetails });
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAllRestaurants = async (req, res) => {
    try {
        const allRestaurantDetails = await RestaurantDetails.find({});
        res.status(200).json(allRestaurantDetails); // Return all restaurant details
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
module.exports ={  createRestaurant ,getAllRestaurants};

