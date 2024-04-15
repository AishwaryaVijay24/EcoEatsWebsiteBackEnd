
const express = require('express');
const cors = require('cors');
const connectDB = require('./db/config');
const authController = require('./controllers/userController');
const contactusController = require('./controllers/contactController');
const businessController = require('./controllers/businessController');
const restaurantController =require('./controllers/restaurantController');
const menuController = require('./controllers/menuController');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://localhost:3000','https://eco-eats-frontend.vercel.app'],
    credentials: true // If you need to include cookies in cross-origin requests
}));
connectDB();

// Registration endpoint
app.post("/", authController.registerUser);
// Login endpoint
app.post("/login", authController.loginUser);
//contact endpoint
app.post("/contactus", contactusController.contactUser);
//business Register
app.post("/submitbusinesslogin", businessController.BusinessloginUser);
//business Login
app.post("/submitbusinessregistration", businessController.BusinessregisterUser);
//restDetails endpoint
app.post("/restdetails", restaurantController.createRestaurant);
// Get all restaurants endpoint (changed from POST to GET)
app.get('/restaurants',restaurantController.getAllRestaurants);
//menuitem endpoint
app.post("/menuitems", menuController.MenuItems);
//fetch menu details
app.get('/menuitems/:restaurantId', menuController.getMenuItemsByRestaurant);
//delete menu item
app.delete('/menuitems/:itemName', menuController.deleteItemsByRestaurant);


// #GLOBAL ERROR HANDLERS (Fixed typo in message)
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message, // Fixed typo here
    });
});

app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
