
const ContactUs = require('../models/Contact');

const contactUser = async (req, res) => {
    const { contactName,contactEmail,contactMessage } = req.body;

    try {
        // Create a new user
        const newContactUser = new ContactUs({
           contactName:contactName,
           contactEmail:contactEmail,
           contactMessage:contactMessage
        });

        // Save the user to the database
        await  newContactUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports= {contactUser};
