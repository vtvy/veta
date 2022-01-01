const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const { cloudinary } = require('../configs');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');
const verifyToken = require('../middleware/auth');

const otp = parseInt(Math.random() * 10000).toString();

const User = require('../models/User');

const transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	service: 'Gmail',
	auth: {
		user: 'vnteamnoreply@gmail.com',
		pass: 's@oslpVN',
	},
});

//send otp
router.post('/otp', async (req, res) => {
	const { email } = req.body;

	try {
		//Check for exists
		const existUser = await User.findOne({ email });

		if (existUser) {
			return res.json({
				success: false,
				message: 'This email has been registered',
			});
		} else {
			let mailOptions = {
				from: 'vnteamnoreply@gmail.com',
				to: email,
				subject: 'Otp for registration is: ',
				html:
					'<h3>OTP for account verification is </h3>' +
					"<h1 style='font-weight:bold; color:#4F46E5;'>" +
					otp +
					'</h1>',
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				} else {
					return res.json({
						success: true,
						message: 'OTP has been send',
					});
				}
			});
		}
	} catch (error) {
		console.log(error);
	}
});

router.post('/confirmOtp', async (req, res) => {
	const inputOtp = req.body.otp;
	if (inputOtp === otp) {
		res.json({ success: true, message: 'OTP is correct' });
	} else {
		res.json({ success: false, message: 'OTP is incorrect' });
	}
});

//Register an account
router.post('/register', async (req, res) => {
	const user = req.body;
	var avatarPath = '';
	console.log(user.isDefault);
	if (user.isDefault === 'true') {
		await cloudinary.uploader.upload(
			`../client/public/assets/images/avatars/${user.avatar}`,
			{ folder: 'veta/avatars' },
			(error, result) => {
				avatarPath = result.public_id;
				console.log(avatarPath);
			}
		);
	} else {
		const file = req.files.avatar;
		await cloudinary.uploader.upload(
			file.tempFilePath,
			{ folder: 'veta/avatars' },
			(error, result) => {
				avatarPath = result.public_id;
				console.log(avatarPath);
			}
		);
	}

	//Create new account
	try {
		const hash = bcrypt.hashSync(user.password, saltRounds);
		const newUser = new User({
			email: user.email,
			password: hash,
			avatar: avatarPath,
			firstName: user.firstName,
			lastName: user.lastName,
			birthDate: user.birthDate,
		});
		await newUser.save();

		//Return token
		const accessToken = jwt.sign(
			{ userID: newUser._id },
			process.env.ACCESS_TOKEN_CODE
		);

		res.json({ success: true, message: 'Register successfully', accessToken });
	} catch (e) {
		res.json({ success: false, message: 'You need to input all fields' });
	}
});

//Login
router.post('/login', async (req, res) => {
	const { email, password } = req.body;

	try {
		//Check for exists
		const existUser = await User.findOne({ email });

		if (!existUser) {
			return res.json({
				success: false,
				message: 'Invalid account',
			});
		} else {
			const match = bcrypt.compareSync(password, existUser.password);
			if (!match) {
				return res.json({
					success: false,
					message: 'Invalid account',
				});
			} else {
				//Return token
				const accessToken = jwt.sign(
					{
						userID: existUser._id,
					},
					process.env.ACCESS_TOKEN_CODE
				);

				res.json({
					success: true,
					message: 'Login successfully',
					accessToken,
				});
			}
		}
	} catch (error) {
		console.log(error);
	}
});

router.get('/', verifyToken, async (req, res) => {
	const { userID } = req.body;
	const existUser = await User.findOne({ _id: userID });
	let user = {
		userID,
		avatar: existUser.avatar,
		firstName: existUser.firstName,
		lastName: existUser.lastName,
		email: existUser.email,
	};
	res.json({ success: true, message: 'Validate successfully', user });
});

module.exports = router;
