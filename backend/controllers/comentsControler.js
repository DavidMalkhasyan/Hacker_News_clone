import commentService from "../services/commentsService.js";

class CommentController {
  async getComments(req, res) {
    try {
      const comments = await commentService.getCommentsByPostId(req.params.postId);
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      if (error.message === "Post not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error fetching comments" });
    }
  }

  async getCommentsById(req, res) {
    try {
      const comments = await commentService.getCommentsWithReplies(req.params.postId);
      return res.status(200).json(comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ error: "Error fetching comments" });
    }
  }

  async newComment(req, res) {
    try {
      const { text } = req.body;
      const parentCommentId = req.params.commentId || req.body.parentCommentId || null;
  
      const comment = await commentService.createComment({
        text,
        postId: req.params.postId,
        authorId: req.user.id,
        parentCommentId
      });
  
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      if (["Post ID must be provided", "Comment text is required", "Post not found", "Parent comment not found"].includes(error.message)) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error creating comment" });
    }
  }
  

  async deleteComment(req, res) {
    try {
      await commentService.deleteComment(req.params.id);
      return res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
      if (error.message === "Comment not found") {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error deleting comment" });
    }
  }

  async getAllComments(req, res) {
    try {
      const comments = await commentService.getAllComments();
      res.status(200).json(comments);
    } catch (err) {
      console.error("Error fetching all comments:", err);
      res.status(500).json({ error: "Failed to fetch comments" });
    }
  }

  async replyToComment(req, res) {
    try {
      const { text } = req.body;
      const { postId, commentId } = req.params;
  
      const reply = await commentService.createReply({
        text,
        postId,
        authorId: req.user.id,
        parentCommentId: commentId,
      });
  
      return res.status(201).json(reply);
    } catch (error) {
      console.error("Error creating reply:", error);
      if (["Post ID must be provided", "Comment text is required", "Post not found", "Parent comment not found"].includes(error.message)) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Error creating reply" });
    }
  }
  
}

export default new CommentController();