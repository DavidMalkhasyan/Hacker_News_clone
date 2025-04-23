const Post = require("../models/Post");
const Comment = require('../models/Comment'); 

class Posts {
    async newPost(req, res) {
        try {
            const { title, content } = req.body;
            const post = await Post.create({ title, content });
            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json({ error: "Error creating post" });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await Post.find();
            if (!posts || posts.length === 0) {
                return res.status(404).json({ error: "Empty Data Base" });
            }
            return res.status(200).json(posts);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching posts" });
        }
    }

    async getPost(req, res) {
        try {
            const post = await Post.findById(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching post" });
        }
    }

    async updatePost(req, res) {
        try {
            const { title, content } = req.body;
            const post = await Post.findByIdAndUpdate(
                req.params.id,
                { title, content },
                { new: true }
            );
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json(post);
        } catch (error) {
            return res.status(500).json({ error: "Error updating post" });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await Post.findByIdAndDelete(req.params.id);
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Error deleting post" });
        }
    }

    async deleteAllPosts(req, res) {
        try {
            const posts = await Post.deleteMany({});
            if (!posts) {
                return res.status(404).json({ error: "No posts found" });
            }
            return res.status(200).json({ message: "All posts deleted successfully" });
        } catch (error) {
            return res.status(500).json({ error: "Error deleting posts" });
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
          console.error("❌ Error creating comment:", error);
          return res.status(500).json({ error: "Error creating comment", details: error.message });
        }
      }
      
      

    async getComments(req, res) {
        try {
            const postId = req.params.postId;
            const post = await Post.findById(postId).populate("comments");
            if (!post) {
                return res.status(404).json({ error: "Post not found" });
            }
            return res.status(200).json(post.comments);
        } catch (error) {
            return res.status(500).json({ error: "Error fetching comments" });
        }
    }
}

module.exports = new Posts();
