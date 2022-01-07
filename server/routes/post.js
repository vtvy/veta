const express = require("express");
const router = express.Router();
const { upload, destroy, destroyDirectory, deleteTmp } = require("../utils");

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");
const fs = require("fs");

router.post("/create", verifyToken, async (req, res) => {
  var success = true;
  const { userID, postText } = req.body;
  const file = req.files?.postImage;
  try {
    if (file || postText) {
      var postImage = "";
      //Create new post
      var newPost = new Post({ postText, postImage, userID });
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
        );
      }
    }
  } catch (error) {
    success = false;
    console.log(error);
  }

  if (req.files) await deleteTmp(req.files);
  if (success) {
    return res.json({
      success: true,
      message: "Post a status successfully",
      newPost,
    });
  } else {
    return res.json({
      success: false,
      message: "Cannot create a post",
      error,
    });
  }
});

//Get all post of an user
router.get("/", verifyToken, async (req, res) => {
  const { userID } = req.body;
  const listOfPost = await Post.find({ userID });
  res.json({ success: true, message: "This is list of post", listOfPost });
});

router.get("/:id", verifyToken, async (req, res) => {
  const postID = req.params.id;

  const { userID } = req.body;
  const aPost = await Post.findOne({ userID, postID });
  res.json({ success: true, message: "This is list of post", aPost });
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const postID = req.params.id;
  const { userID, postText, isImageChange } = req.body;

  const updatePost = await Post.findOne({ _id: postID, userID });

  if (!updatePost) {
    res.json({
      success: false,
      message: "You do not have permission to update it",
    });
  }

  try {
    var postImage = updatePost.postImage;
    const file = req.files?.postImage;
    if (isImageChange === "true" && postImage !== "") {
      await destroy(postImage);
      postImage = "";
    }
    if (isImageChange === "true" && file?.name !== undefined) {
      postImage = await upload(file.tempFilePath, "veta/posts");
    }

    //Update a post
    const newPost = { postText, postImage, userID };

    const updatedPost = await Post.findOneAndUpdate(
      { _id: postID, userID },
      newPost,
      { new: true }
    );

    return res.json({
      success: true,
      message: "Update a status successfully",
      updatedPost,
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
  const _id = req.params.id;

  const { userID } = req.body;
  try {
    const deletePost = await Post.findOneAndDelete({ _id, userID });

    if (deletePost.postImage !== "") {
      await destroyDirectory(deletePost.postImage);
      console.log("delete image from cloud successful");
    }

    return res.json({
      success: true,
      message: "Delete a status successfully",
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
