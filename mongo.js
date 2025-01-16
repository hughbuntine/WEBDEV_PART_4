const mongoose = require('mongoose');
require('dotenv').config();
const config = require('./utils/config.js');

mongoose.set('strictQuery',false)

const url = config.MONGODB_URI;

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