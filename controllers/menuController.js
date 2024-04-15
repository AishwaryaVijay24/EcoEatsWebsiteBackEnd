const MenuItem = require('../models/MenuItems');

const MenuItems = async (req, res) => {
    const { itemName, itemPrice, itemCategory, restaurantId } = req.body; // Extract restaurantId from req.body

    try {
        if (!itemName || !itemPrice || !itemCategory || !restaurantId) { // Check if restaurantId is provided
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        const newMenuItem = new MenuItem({
            itemName: itemName,
            itemPrice: itemPrice,
            itemCategory: itemCategory,
            restaurantId: restaurantId // Assign restaurantId to the new menu item
        });

        await newMenuItem.save();

        res.status(201).json({ message: 'Menu item created successfully' });
    } catch (error) {
        console.error('Error creating menu item:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        console.log('Received restaurantId:', restaurantId);
        const menuItems = await MenuItem.find({ restaurantId: restaurantId }); // Find menu items by restaurantId
        console.log('Menu items found:', menuItems);
        res.status(200).json({success:true ,result:menuItems});
    } catch (error) {
        console.error('Error fetching menu items:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteItemsByRestaurant = async (req, res) => {
    try {
        const { itemName } = req.params;
        const deletedItem = await MenuItem.findOneAndDelete({ itemName });
        if (!deletedItem) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }
        res.json({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        console.error('Error deleting menu item:', error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

module.exports = { MenuItems, getMenuItemsByRestaurant,deleteItemsByRestaurant };
