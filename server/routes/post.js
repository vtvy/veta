const express = require("express");
const router = express.Router();

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, async (req, res) => {
  const post = req.body;

  if (!(post.postText || post.postImage))
    return res
      .status(400)
      .json({ success: false, message: "You need to input something" });

  try {
    if (post.postImage) {
      const file = req.files.postImage;
      var filePath =
        post.email.slice(0, 5) + "_" + Date.now().toString() + file.name;
      file.mv(`../client/src/assets/uploads/posts/${filePath}`, (err) => {
        console.error(err);
      });
    }

    //Create new post
    const newPost = new Post({
      postText: post.postText,
      postImage: filePath,
    });
    await newPost.save();
    res.json({ success: true, message: "Post a status successfully", newPost });
  } catch (e) {
    res.json({ success: false, message: "You need to input a value" });
  }
});

module.exports = router;
