const express = require("express");
const router = express.Router();
const { cloudinary } = require("../configs");

const Post = require("../models/Post");
const verifyToken = require("../middleware/auth");

router.post("/create", verifyToken, async (req, res) => {
  const post = req.body;
  if (post.postImage === undefined || post.postText !== "") {
    try {
      var filePath = "";
      if (req.files?.postImage) {
        const file = req.files.postImage;

        await cloudinary.uploader.upload(
          file.tempFilePath,
          { folder: "veta/posts" },
          (error, result) => {
            filePath = result.public_id;
          }
        );
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
  const { userID, postText, isImgChange } = req.body;

  const updatePost = await Post.findOne({ _id: postID, user: userID });

  if (!updatePost) {
    res.json({
      success: false,
      message: "You do not have permission to update it",
    });
  }

  try {
    var imgName = updatePost.postImage;
    const file = req.files?.postImage;
    if (isImgChange === "true" && imgName !== "") {
      cloudinary.uploader.destroy(imgName, (err, result) => {
        imgName = "";
        console.log(imgName);
      });
    }
    if (isImgChange === "true" && file?.name !== undefined) {
      cloudinary.uploader.upload(
        file.tempFilePath,
        { folder: "veta/posts" },
        (err, result) => {
          imgName = result.public_id;
          console.log(imgName);
        }
      );
    }

    //Update a post
    const newPost = {
      postText,
      postImage: imgName,
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
      await cloudinary.uploader.destroy(deletePost.postImage, (err, result) => {
        console.log("delete image from cloud successful");
      });
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
