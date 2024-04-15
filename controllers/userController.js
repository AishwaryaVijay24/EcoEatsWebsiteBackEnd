const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerUser = async (req, res) => {
    const { name, email, phoneNumber, password, countryCode } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name: name,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPassword,
            countryCode: countryCode
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user in the database
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Login successful
        res.json({ message: "Login successful" });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };