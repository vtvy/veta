const express = require("express");
const router = express.Router();
const fs = require("fs");

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, async (req, res) => {
  const post = req.body;
  if (post.postImage === undefined || post.postText !== "") {
    try {
      var filePath = "";
      if (req.files?.postImage) {
        const file = req.files.postImage;
        filePath =
          post.email.slice(0, 5) + "_" + Date.now().toString() + file.name;
        file.mv(`../client/public/assets/uploads/posts/${filePath}`, (err) => {
          console.error(err);
        });
      }

      //Create new post
      const newPost = new Post({
        postText: post.postText,
        postImage: filePath,
        user: post.userID,
      });
      await newPost.save();
      return res.json({
        success: true,
        message: "Post a status successfully",
        newPost,
      });
    } catch (error) {
      return res.json({
        success: false,
        message: "Cannot create a post",
        error,
      });
    }
  }
  return res.json({ success: false, message: "You need to input something" });
});

//Get all post of an user
router.get("/", verifyToken, async (req, res) => {
  const { userID } = req.body;
  const listOfPost = await Post.find({ user: userID });
  res.json({ success: true, message: "This is list of post", listOfPost });
});

router.get("/:id", verifyToken, async (req, res) => {
  const postID = req.params.id;

  const { userID } = req.body;
  const aPost = await Post.findOne({ user: userID, postID });
  res.json({ success: true, message: "This is list of post", aPost });
});

router.put("/update/:id", verifyToken, async (req, res) => {
  const postID = req.params.id;
  const { userID, postText, email } = req.body;

  const updatePost = await Post.findOne({ _id: postID, user: userID });

  if (!updatePost) {
    res.json({
      success: false,
      message: "You do not have permission to delete it",
    });
  }

  const imgName = updatePost.postImage;
  const file = req.files?.postImage;
  var filePath = "";

  try {
    if (imgName !== "" && imgName.slice(-file?.name?.length) !== file?.name) {
      fs.unlinkSync(`../client/public/assets/uploads/posts/${imgName}`);
    }
    if (file?.name !== undefined) {
      filePath = email.slice(0, 5) + "_" + Date.now().toString() + file.name;
      file.mv(`../client/public/assets/uploads/posts/${filePath}`, (err) => {
        console.error(err);
      });
    }

    //Update a post
    const newPost = {
      postText,
      postImage: filePath,
      user: userID,
    };
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postID, user: userID },
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
  const postID = req.params.id;

  const { userID } = req.body;
  try {
    const deletePost = await Post.findOneAndDelete({
      _id: postID,
      user: userID,
    });

    if (deletePost.postImage !== "") {
      fs.unlinkSync(
        `../client/public/assets/uploads/posts/${deletePost.postImage}`
      );
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
