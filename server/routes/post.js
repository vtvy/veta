const express = require('express');
const router = express.Router();
const { upload, destroy, destroyDirectory, deleteTmp } = require('../utils');

const Post = require('../models/Post');
const Comment = require('../models/Comment');
const ChildComment = require('../models/ChildComment');
const verifyToken = require('../middleware/auth');
var success = false;

router.post('/create', verifyToken, async (req, res) => {
	const { userID, postText } = req.body;
	const file = req.files?.postImage;
	try {
		if (file || postText) {
			var postImage = '';
			//Create new post
			var newPost = new Post({ postText, postImage, user: userID });
			await newPost.save();
			if (file) {
				postImage = await upload(
					file.tempFilePath,
					`veta/posts/${newPost._id}`
				);

				//Update a post
				newPost = await Post.findOneAndUpdate(
					{ _id: newPost._id },
					{ postImage },
					{ new: true }
				).populate({
					path: 'user',
					select: 'avatar name',
				});
			}
			success = true;
		}
	} catch (error) {
		console.log(error);
	}

	if (req.files) await deleteTmp(req.files);
	if (success) {
		res.json({
			success,
			message: 'Post a status successfully',
			newPost,
		});
	} else {
		res.json({
			success,
			message: 'Cannot create a post',
		});
	}
});

//Get all post of an user
router.get('/', verifyToken, async (req, res) => {
	const { userID } = req.body;
	const listOfPost = await Post.find({ user: userID }).populate({
		path: 'user',
		select: 'avatar name',
	});
	res.json({ success: true, message: 'This is list of post', listOfPost });
});

router.get('/:id', verifyToken, async (req, res) => {
	const postID = req.params.id;

	const { userID } = req.body;
	const Post = await Post.findOne({ user: userID, post: postID }).populate({
		path: 'user',
		select: 'avatar name',
	});
	res.json({ success: true, message: 'This is a post', Post });
});

router.put('/update/:id', verifyToken, async (req, res) => {
	const postID = req.params.id;
	const { userID, postText, isImageChange } = req.body;

	const updatePost = await Post.findOne({ _id: postID, user: userID });

	try {
		if (updatePost) {
			var postImage = updatePost.postImage;
			const file = req.files?.postImage;
			if (isImageChange === 'true' && postImage !== '') {
				await destroy(postImage);
				postImage = '';
			}
			if (isImageChange === 'true' && file?.name !== undefined) {
				postImage = await upload(file.tempFilePath, 'veta/posts');
			}

			//Update a post
			const newPost = { postText, postImage, user: userID };

			var updatedPost = await Post.findOneAndUpdate(
				{ _id: postID, user: userID },
				newPost,
				{ new: true }
			).populate({
				path: 'user',
				select: 'avatar name',
			});

			success = true;
		}
	} catch (error) {
		console.log(error);
	}

	if (req.files) await deleteTmp(req.files);
	if (success) {
		res.json({
			success,
			message: 'Update a status successfully',
			updatedPost,
		});
	} else {
		res.json({
			success,
			message: 'Update fail',
		});
	}
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
	const _id = req.params.id;
	const { userID } = req.body;
	try {
		const deletePost = await Post.findOneAndDelete({ _id, user: userID });

		await destroyDirectory(`veta/posts/${deletePost._id}`);
		await Comment.deleteMany({ post: deletePost._id });
		await ChildComment.deleteMany({ post: deletePost._id });

		res.json({
			success: true,
			message: 'Delete a status successfully',
		});
	} catch (error) {
		console.log(error);
		res.json({
			success: false,
			message: 'Delete fail',
		});
	}
});

module.exports = router;
