const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { upload, transporter, deleteTmp } = require('../utils');
const otp = parseInt(Math.random() * 10000).toString();
const saltRounds = 10;
var success = false;

const User = require('../models/User');

const authController = {
	sendOTP: async (req, res) => {
		const { email } = req.body;
		try {
			//Check for exists
			const existUser = await User.findOne({ email });

			if (!existUser) {
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
				await transporter.sendMail(mailOptions);
			}
			success = true;
		} catch (error) {
			console.log(error);
		}
		if (req.files) await deleteTmp(req.files);
		if (success) {
			res.json({
				success,
				message: 'OTP has been send',
			});
		} else {
			res.json({
				success,
				message: 'This email has been registered',
			});
		}
	},

	confirmOTP: async (req, res) => {
		const inputOtp = req.body.otp;
		if (req.files) await deleteTmp(req.files);
		if (inputOtp === otp) {
			res.json({ success: true, message: 'OTP is correct' });
		} else {
			res.json({ success, message: 'OTP is incorrect' });
		}
	},

	register: async (req, res) => {
		const {
			isDefault,
			avatar,
			password,
			firstName,
			lastName,
			birthDate,
			email,
		} = req.body;
		var avatarPath = '';
		if (isDefault === 'true') {
			avatarPath = await upload(
				`../client/public/assets/images/avatars/${avatar}`,
				'veta/avatars'
			);
		} else {
			const file = req.files.avatar;
			avatarPath = await upload(file.tempFilePath, 'veta/avatars');
		}

		try {
			//Create new account
			const hash = bcrypt.hashSync(password, saltRounds);
			const newUser = new User({
				email,
				password: hash,
				avatar: avatarPath,
				name: firstName + ' ' + lastName,
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

		if (req.files) await deleteTmp(req.files);
		if (success) {
			res.json({
				success,
				message: 'Register successfully',
				accessToken,
			});
		} else {
			res.json({ success, message: 'You need to input all fields' });
		}
	},

	login: async (req, res) => {
		const { email, password } = req.body;
		console.log(email);
		try {
			//Check for exists
			const existUser = await User.findOne({ email });

			if (existUser) {
				const match = bcrypt.compareSync(password, existUser.password);
				if (match) {
					//Return token
					var accessToken = jwt.sign(
						{
							userID: existUser._id,
						},
						process.env.ACCESS_TOKEN_CODE
					);
					success = true;
				}
			}
		} catch (error) {
			console.log(error);
		}

		if (req.files) await deleteTmp(req.files);
		if (success) {
			res.json({
				success,
				message: 'Login successfully',
				accessToken,
			});
		} else {
			res.json({
				success,
				message: 'Invalid account',
			});
		}
	},

	auth: async (req, res) => {
		const { userID } = req.body;
		const existUser = await User.findOne({ _id: userID }).select(
			'avatar name email followers'
		);
		res.json({
			success: true,
			message: 'Validate successfully',
			user: existUser,
		});
	},
};

module.exports = authController;
