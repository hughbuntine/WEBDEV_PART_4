const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI

// Conect to the Mongo DB
const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit if connection fails
    }
};

module.exports = connectDB;