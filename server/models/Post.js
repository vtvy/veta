const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PostSchema = new Schema(
	{
		postText: String,
		postImage: String,
		userID: {
			type: Schema.Types.ObjectId,
			ref: 'user',
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model('post', PostSchema);
