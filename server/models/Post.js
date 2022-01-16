const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    postText: String,
    postImage: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true }
);

PostSchema.virtual("commentCount", {
  ref: "comment",
  localField: "_id",
  foreignField: "post",
  count: true, // Set `count: true` on the virtual
});

module.exports = mongoose.model("post", PostSchema);
