const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");

const connectDB = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://vetaweb:showPass@veta.cud0a.mongodb.net/veta?retryWrites=true&w=majority`
    );
    console.log("Database connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

connectDB();

const app = express();

app.use("/account/auth", authRouter);

const PORT = 9999;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
