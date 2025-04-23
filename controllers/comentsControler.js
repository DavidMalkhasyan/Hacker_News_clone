const Comment = require('../models/Comment'); 

class CommentController {
  async getComments(req, res) {
    try {
      const postId = req.params.postId;
      const post = await Post.findById(postId).populate("comments");
  
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      return res.status(200).json(post.comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
      return res.status(500).json({ error: "Error fetching comments" });
    }
  }
  

  async newComment(req, res) {
    try {
      const { text } = req.body;
      const postId = req.params.postId;

  
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: "Post not found" });
      }
  
      const comment = new Comment({
        text,
        postId,
        author: req.user.id 
      });
  
      await comment.save();
  
      post.comments.push(comment._id);
      await post.save();
  
      return res.status(201).json(comment);
    } catch (error) {
      console.error("Error creating comment:", error);
      return res.status(500).json({ error: "Error creating comment" });
    }
  }
  

  async deleteComment(req, res) {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id);
      if (!comment) {
        return res.status(404).json({ error: 'Comment not found' });
      }
      return res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
      return res.status(500).json({ error: 'Error deleting comment' });
    }
  } 
}

module.exports = new CommentController();
