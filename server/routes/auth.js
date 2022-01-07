const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const verifyToken = require("../middleware/auth");
const { upload, transporter, deleteTmp } = require("../utils");

const otp = parseInt(Math.random() * 10000).toString();
const saltRounds = 10;

const User = require("../models/User");

//send otp
router.post("/otp", async (req, res) => {
  var success = false;
  const { email } = req.body;
  try {
    //Check for exists
    const existUser = await User.findOne({ email });

    if (!existUser) {
      let mailOptions = {
        from: "vnteamnoreply@gmail.com",
        to: email,
        subject: "Otp for registration is: ",
        html:
          "<h3>OTP for account verification is </h3>" +
          "<h1 style='font-weight:bold; color:#4F46E5;'>" +
          otp +
          "</h1>",
      };
      await transporter.sendMail(mailOptions);
    }
    success = true;
  } catch (error) {
    console.log(error);
  }
  if (req.files) await deleteTmp(req.files);
  if (success) {
    return res.json({
      success,
      message: "OTP has been send",
    });
  } else {
    return res.json({
      success,
      message: "This email has been registered",
    });
  }
});

router.post("/confirmOtp", async (req, res) => {
  const inputOtp = req.body.otp;
  if (req.files) await deleteTmp(req.files);
  if (inputOtp === otp) {
    res.json({ success: true, message: "OTP is correct" });
  } else {
    res.json({ success: false, message: "OTP is incorrect" });
  }
});

//Register an account
router.post("/register", async (req, res) => {
  var success = false;
  const {
    isDefault,
    avatar,
    userID,
    password,
    firstName,
    lastName,
    birthDate,
    email,
  } = req.body;
  var avatarPath = "";
  if (isDefault === "true") {
    avatarPath = await upload(
      `../client/public/assets/images/avatars/${avatar}`,
      "veta/avatars"
    );
  } else {
    const file = req.files.avatar;
    avatarPath = await upload(file.tempFilePath, "veta/avatars");
  }

  try {
    //Create new account
    const hash = bcrypt.hashSync(password, saltRounds);
    const newUser = new User({
      email,
      password: hash,
      avatar: avatarPath,
      firstName,
      lastName,
      birthDate,
    });
    await newUser.save();

    //Return token
    var accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_CODE
    );

    success = true;
  } catch (e) {
    console.log(e);
  }
  if (success) {
    res.json({ success, message: "Register successfully", accessToken });
  } else {
    res.json({ success, message: "You need to input all fields" });
  }
});

//Login
router.post("/login", async (req, res) => {
  var success = false;
  const { email, password } = req.body;

  try {
    //Check for exists
    const existUser = await User.findOne({ email });

    if (!existUser) {
      return res.json({
        success: false,
        message: "Invalid account",
      });
    } else {
      const match = bcrypt.compareSync(password, existUser.password);
      if (!match) {
        return res.json({
          success: false,
          message: "Invalid account",
        });
      } else {
        //Return token
        const accessToken = jwt.sign(
          {
            userID: existUser._id,
          },
          process.env.ACCESS_TOKEN_CODE
        );

        if (req.files) deleteTmp(req.files);
        res.json({
          success: true,
          message: "Login successfully",
          accessToken,
        });
      }
    }
  } catch (error) {
    console.log(error);
    if (req.files) deleteTmp(req.files);
    res.json({
      succes: false,
      message: "Invalid account",
    });
  }
});

router.get("/", verifyToken, async (req, res) => {
  const { userID } = req.body;
  const existUser = await User.findOne({ _id: userID });
  let user = {
    userID,
    avatar: existUser.avatar,
    firstName: existUser.firstName,
    lastName: existUser.lastName,
    email: existUser.email,
  };
  res.json({ success: true, message: "Validate successfully", user });
});

module.exports = router;
