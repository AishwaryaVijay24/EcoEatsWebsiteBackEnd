const mongoose = require('mongoose');
//mongoConnection
const connectDB = async () => {
  try {
    const connection = await mongoose.connect('mongodb+srv://flexiapp:flexiapp@cluster0.atomu7c.mongodb.net/RegLogin');
    console.log('MongoDB Connected Successfully!');
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;