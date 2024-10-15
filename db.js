const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://clucellas88:<db_password>@clucellas88.lbpez.mongodb.net/?retryWrites=true&w=majority&appName=clucellas88');
        console.log('MongoDB Connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
