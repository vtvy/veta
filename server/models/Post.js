import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  postText: String,
  postImage: String,
  isEdit: { type: Boolean, default: false },
  createAt: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model("post", PostSchema);
