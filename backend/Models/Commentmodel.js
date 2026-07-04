const mongoose=require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    likes: {
      type: Number,
      default: 0,
    },
    image: {
      type: String, // Store image URL or Base64 string
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const commentmodel= mongoose.model("Comment", CommentSchema);
module.exports=commentmodel;
