const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, async (req, res) => {
  const post = req.body;

  console.log(post.postText !== "");
  if (post.postImage === undefined || post.postText !== "") {
    try {
      if (req.files.postImage) {
        const file = req.files.postImage;
        var filePath =
          req.email.slice(0, 5) + "_" + Date.now().toString() + file.name;
        file.mv(`../client/public/assets/uploads/posts/${filePath}`, (err) => {
          console.error(err);
        });
      }

      //Create new post
      const newPost = new Post({
        postText: post.postText,
        postImage: filePath,
        user: req.userID,
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
        message: "You need to input a value",
        error,
      });
    }
  }
  return res.json({ success: false, message: "You need to input something" });
});

router.get("/", verifyToken, async (req, res) => {
  const { userID } = req.body;
  console.log("o");
  const listOfPost = Post.findAll({ user: userID });
  res.json({ success: true, message: "This is list of post", listOfPost });
});

module.exports = router;
