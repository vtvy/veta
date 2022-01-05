const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.CLOUD_KEY,
	api_secret: process.env.CLOUD_SECRET,
});

const upload = async (path, folder, isRemoveTemp = true) => {
	var imagePath = '';
	await cloudinary.uploader.upload(path, { folder }, (error, result) => {
		imagePath = result.public_id;
	});

	if (isRemoveTemp) fs.unlinkSync(path);

	return imagePath;
};

const destroy = async (path) => {
	await cloudinary.uploader.destroy(path);
};

module.exports = { upload, destroy };
