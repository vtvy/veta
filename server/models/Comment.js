const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    commentText: String,
    commentImage: String,
    userID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    postID: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
