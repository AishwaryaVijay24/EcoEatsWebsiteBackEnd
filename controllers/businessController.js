const bcrypt = require('bcrypt');
const BusinessUser = require('../models/BusinessRegLogin');

const BusinessregisterUser = async (req, res) => {
    const { Ownername, Owneremail, Ownerphone, Ownerpassword, Ownercity} = req.body;

    try {
        // Check if the user already exists
        const existingBusinessUser = await BusinessUser.findOne({ Owneremail: Owneremail });
        if (existingBusinessUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password before saving it
        const hashedPassword = await bcrypt.hash(Ownerpassword, 10);

        // Create a new user
        const newBusinessUser = new BusinessUser({
            Ownername: Ownername,
            Owneremail: Owneremail,
            Ownerphone: Ownerphone,
            Ownerpassword: hashedPassword,
            Ownercity:Ownercity,
        });

        // Save the user to the database
        await newBusinessUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const BusinessloginUser = async (req, res) => {
    const { Owneremail, Ownerpassword } = req.body;

    try {
        // Find the user in the database
        const businessuser = await BusinessUser.findOne({ Owneremail });

        if (!businessuser) {
            return res.status(401).json({ message: "User does not exist" });
        }

        // Compare the provided password with the hashed password stored in the database
        const isPasswordValid = await bcrypt.compare(Ownerpassword, businessuser.Ownerpassword);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Login successful
        res.json({ message: "Login successful"  });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { BusinessregisterUser, BusinessloginUser };