const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const fs = require('fs');

const otp = parseInt(Math.random() * 10000);

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
	console.log(1);
	const email = req.body.email;
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
					"<h1 style='font-weight:bold;'>" +
					otp +
					'</h1>',
			};
			transporter.sendMail(mailOptions, (error, info) => {
				if (error) {
					return console.log(error);
				} else {
					console.log('Message sent: %s', info.response);
					console.log(2);

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
	const user = req.body;

	if (user.otp == otp) {
		res.json({ success: true, message: 'OTP is correct' });
	} else {
	}
});
//Register an account
router.post('/register', async (req, res) => {
	console.log(3);

	const user = req.body;
	var avatarPath = '';
	console.log(req.files);

	if (user.isDefault) {
		avatarPath = user.firstName + Date.now + user.avatar;
		console.log(avatarPath);

		fs.copyFile(
			`../../client/src/assets/images/avatars/${user.avatar}`,
			`../../client/src/assets/uploads/avatars/${avatarPath}`,
			(err) => {
				console.log(err);
			}
		);
	} else {
		const file = req.files.file;
		avatarPath = user.firstName + Date.now + file.name;
		console.log(avatarPath);
		file.mv(`../../client/src/assets/uploads/avatars/${avatarPath}`, (err) => {
			console.error(err);
		});
	}

	//Create new account
	console.log(avatarPath);

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
	console.log(4);
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
				const accessToken = jwt.sign(
					{ userID: existUser._id },
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

router.get('/', (req, res) => res.send('User'));

module.exports = router;
