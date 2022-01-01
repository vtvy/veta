const express = require("express");
const router = express.Router();
const { cloudinary } = require("../configs");
const verifyToken = require("../middleware/auth");

const Comment = require("../models/Comment");

router.post("/create", verifyToken, async (req, res) => {
  const cmt = req.body;
  if (cmt.commentImage === undefined || cmt.postText !== "") {
    try {
      var filePath = "";
      if (req.files?.commentImage) {
        const file = req.files.commentImage;
        await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "veta/comments" },
          (error, result) => {
            filePath = result.public_id;
          }
        );
      }

      //Create new comment
      const newCmt = new Comment({
        postComment: cmt.commentText,
        commentImage: filePath,
        userID: cmt.userID,
        postID: cmt.postID,
      });
      await newCmt.save();
      return res.json({
        success: true,
        message: "Comment successfully",
        newCmt,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Cannot comment at this post",
        error,
      });
    }
  }
  return res.json({ success: false, message: "You need to input something" });
});

//Get all comment of a post
router.get("/", verifyToken, async (req, res) => {
  const { postID } = req.body;
  const listOfPost = await Comment.find({ postID: postID });
  res.json({
    success: true,
    message: "This is list of comment",
    listOfComment,
  });
});

router.put("/update/:id", verifyToken, async (req, res) => {
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
      message: "You do not have permission to update it",
    });
  }

  try {
    var imgName = updateComment.commentImage;
    const file = req.files?.commentImage;
    if (isImageChange === "true" && imgName !== "") {
      cloudinary.uploader.destroy(imgName, (err, result) => {
        imgName = "";
        console.log(imgName);
      });
    }
    if (isImageChange === "true" && file?.name !== undefined) {
      cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "veta/comments" },
        (err, result) => {
          imgName = result.public_id;
          console.log(imgName);
        }
      );
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
      message: "Update a comment successfully",
      updatedComment,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Update fail",
      error,
    });
  }
});

router.delete("/delete/:id", verifyToken, async (req, res) => {
  const commentID = req.params.id;

  const { userID, postID } = req.body;
  try {
    const deleteComment = await Comment.findOneAndDelete({
      _id: commentID,
      userID: userID,
      postID: postID,
    });

    if (deleteComment.commentImage !== "") {
      await cloudinary.uploader.destroy(
        deleteComment.postImage,
        (err, result) => {
          console.log("Delete image from cloud successful");
        }
      );
    }

    return res.json({
      success: true,
      message: "Delete a comment successfully",
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Delete fail",
    });
  }
});

module.exports = router;
