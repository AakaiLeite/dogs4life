const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    content: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    breedRelated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Breed",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
