const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    postComment: String,
    postImage: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    parentComment: {
      type: Schema.Types.ObjectId,
      ref: "comment",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);
