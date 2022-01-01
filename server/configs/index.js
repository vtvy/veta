require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@veta.cud0a.mongodb.net/veta?retryWrites=true&w=majority`
    );
    console.log("Database connected");
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.CLOUD_KEY,
      api_secret: process.env.CLOUD_SECRET,
    });
    console.log("Cloudinary connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = { connectDB, cloudinary };
