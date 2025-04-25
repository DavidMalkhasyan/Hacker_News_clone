const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        text: {
            type: String,
            required: true,
        },
        postId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        parentCommentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
            default: null,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        replies: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Comment",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);
