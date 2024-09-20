const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables

const connectDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
    .then((resp) => {
      console.log("Database Connected!");
    })
    .catch((error) => console.log("Unable to connect to DB!" + error));
};

module.exports = connectDB;
