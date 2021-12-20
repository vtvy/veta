require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@veta.cud0a.mongodb.net/veta?retryWrites=true&w=majority`
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);

const PORT = 9999;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
