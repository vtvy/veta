const express = require('express');
const router = express.Router();
const { upload, destroy } = require('../utils');
const verifyToken = require('../middleware/auth');

const Comment = require('../models/Comment');

router.post('/create', verifyToken, async (req, res) => {
	const cmt = req.body;
	console.log(cmt);
	if (cmt.commentImage === undefined || cmt.postText !== '') {
		try {
			var filePath = '';
			if (req.files?.commentImage) {
				const file = req.files.commentImage;
				filePath = upload(file.tempFilePath, 'veta/comments');
			}

			//Create new comment
			const newCmt = new Comment({
				commentText: cmt.commentText,
				commentImage: filePath,
				userID: cmt.userID,
				postID: cmt.postID,
			});
			await newCmt.save();
			return res.json({
				success: true,
				message: 'Comment successfully',
				newCmt,
			});
		} catch (error) {
			return res.json({
				success: false,
				message: 'Cannot comment at this post',
				error,
			});
		}
	}
	return res.json({ success: false, message: 'You need to input something' });
});

//Get all comment of a post
router.get('/:id', verifyToken, async (req, res) => {
	console.log(req.body);
	const postID = req.params.id;
	console.log(postID);
	const listOfComment = await Comment.find({ postID: postID });
	res.json({
		success: true,
		message: 'This is list of comment',
		listOfComment,
	});
});

router.put('/update/:id', verifyToken, async (req, res) => {
	const commentID = req.params.id;
	const { userID, commentText, isImageChange, postID } = req.body;

	const updateComment = await Comment.findOne({
		_id: commentID,
		userID: userID,
		postID: postID,
	});

	if (!updateComment) {
		res.json({
			success: false,
			message: 'You do not have permission to update it',
		});
	}

	try {
		var imgName = updateComment.commentImage;
		const file = req.files?.commentImage;
		if (isImageChange === 'true' && imgName !== '') {
			await destroy(imgName);
		}
		if (isImageChange === 'true' && file?.name !== undefined) {
			imgName = upload(file.tempFilePath, 'veta/comments');
		}

		//Update a comment
		const newComment = {
			commentText,
			postImage: imgName,
			userID: userID,
			postID: postID,
		};

		const updatedComment = await Comment.findOneAndUpdate(
			{ _id: commentID, userID: userID, postID: postID },
			newComment,
			{ new: true }
		);

		return res.json({
			success: true,
			message: 'Update a comment successfully',
			updatedComment,
		});
	} catch (error) {
		return res.json({
			success: false,
			message: 'Update fail',
			error,
		});
	}
});

router.delete('/delete/:id', verifyToken, async (req, res) => {
	const commentID = req.params.id;

	const { userID } = req.body;
	try {
		const deleteComment = await Comment.findOneAndDelete({
			_id: commentID,
			userID: userID,
		});

		if (deleteComment?.commentImage !== '') {
			await destroy(deleteComment.commentImage);
		}

		return res.json({
			success: true,
			message: 'Delete a comment successfully',
		});
	} catch (error) {
		console.log(error);
		return res.json({
			success: false,
			message: 'Delete fail',
		});
	}
});

module.exports = router;
