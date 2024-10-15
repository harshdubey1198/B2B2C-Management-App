const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, 
    });
    console.log("Database Connected!");
  } catch (error) {
    console.error("Unable to connect to DB: " + error);
  
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB;
