const { Schema, model } = require("mongoose");


const commentSchema = new Schema( {
    comment: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: "Post"},
    user: { type: Schema.Types.ObjectId, ref: "User"},
    upvotes: { type: Number },
    downvotes: { type: Number }
  },
  { timestamps: true }
)