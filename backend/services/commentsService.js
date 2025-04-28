import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

class CommentService {
  async getCommentsByPostId(postId) {
    const post = await Post.findById(postId).populate("comments");
    if (!post) throw new Error("Post not found");
    return post.comments;
  }

  async getCommentsWithReplies(postId) {
    const comments = await Comment.find({ postId }).lean();
    
    const commentMap = {};
    const roots = [];

    comments.forEach((comment) => {
      comment.replies = [];
      commentMap[comment._id.toString()] = comment;
    });

    comments.forEach((comment) => {
      if (comment.parentCommentId) {
        const parent = commentMap[comment.parentCommentId.toString()];
        if (parent) parent.replies.push(comment);
      } else {
        roots.push(comment);
      }
    });

    return roots;
  }

  async createComment({ text, postId, authorId, parentCommentId }) {
    if (!postId) throw new Error("Post ID must be provided");
    if (!text) throw new Error("Comment text is required");

    const post = await Post.findById(postId);
    if (!post) throw new Error("Post not found");

    if (parentCommentId) {
      const parentComment = await Comment.findById(parentCommentId);
      if (!parentComment) throw new Error("Parent comment not found");
    }

    const comment = new Comment({
      text,
      postId,
      author: authorId,
      parentCommentId: parentCommentId || null,
    });

    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    if (parentCommentId) {
      await Comment.findByIdAndUpdate(parentCommentId, {
        $push: { replies: comment._id }
      });
    }

    return comment;
  }

  async deleteComment(commentId) {
    const comment = await Comment.findByIdAndDelete(commentId);
    if (!comment) throw new Error("Comment not found");
    
    await Post.findByIdAndUpdate(comment.postId, {
      $pull: { comments: comment._id }
    });

    if (comment.parentCommentId) {
      await Comment.findByIdAndUpdate(comment.parentCommentId, {
        $pull: { replies: comment._id }
      });
    }

    return comment;
  }

  async getAllComments() {
    return await Comment.find()
      .populate("author", "username")
      .sort({ createdAt: -1 })
      .lean();
  }

  async createReply({ text, postId, authorId, parentCommentId }) {
    return this.createComment({ text, postId, authorId, parentCommentId });
  }
  
}

export default new CommentService();