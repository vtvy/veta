require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		await mongoose.connect(
			`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@veta.cud0a.mongodb.net/veta?retryWrites=true&w=majority`
		);
		console.log('Database connected');
	} catch (error) {
		console.log(error.message);
		process.exit(1);
	}
};

module.exports = connectDB;
