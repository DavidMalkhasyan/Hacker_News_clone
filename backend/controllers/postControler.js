import postService from "../services/postService.js";
import Post from "../models/Post.js";

class PostController {
    async newPost(req, res) {
        try {
            const post = await postService.createPost({
                ...req.body,
                author: req.user.id,
            });
            res.status(201).json(post);
        } catch (error) {
            res.status(500).json({ error: "Error creating post" });
        }
    }

    async getPosts(req, res) {
        try {
            const posts = await postService.getPostsByType(req.query.type);
            if (!posts.length) {
                return res.status(404).json({ error: "No posts found" });
            }
            res.status(200).json(posts);
        } catch {
            res.status(500).json({ error: "Error fetching posts" });
        }
    }

    async getPost(req, res) {
        try {
            const post = await postService.getPostById(req.params.id);
            if (!post) return res.status(404).json({ error: "Post not found" });
            res.status(200).json(post);
        } catch {
            res.status(500).json({ error: "Error fetching post" });
        }
    }

    async updatePost(req, res) {
        try {
            const post = await postService.updatePost(req.params.id, req.body);
            if (!post) return res.status(404).json({ error: "Post not found" });
            res.status(200).json(post);
        } catch {
            res.status(500).json({ error: "Error updating post" });
        }
    }

    async deletePost(req, res) {
        try {
            const post = await postService.deletePost(req.params.id);
            if (!post) return res.status(404).json({ error: "Post not found" });
            res.status(200).json({ message: "Post deleted successfully" });
        } catch {
            res.status(500).json({ error: "Error deleting post" });
        }
    }

    async deleteAllPosts(req, res) {
        try {
            await postService.deleteAllPosts();
            res.status(200).json({ message: "All posts deleted successfully" });
        } catch {
            res.status(500).json({ error: "Error deleting posts" });
        }
    }

    async newComment(req, res) {
        try {
            const comment = await postService.createComment({
                postId: req.params.postId,
                text: req.body.text,
                author: req.user.id,
            });
            if (!comment)
                return res.status(404).json({ error: "Post not found" });
            res.status(201).json(comment);
        } catch (error) {
            res.status(500).json({ error: "Error creating comment" });
        }
    }

    async getComments(req, res) {
        try {
            const comments = await postService.getComments(req.params.postId);
            if (!comments)
                return res.status(404).json({ error: "Post not found" });
            res.status(200).json(comments);
        } catch {
            res.status(500).json({ error: "Error fetching comments" });
        }
    }

    async searchPosts(req, res) {
        try {
            const query = req.query.query;
            if (!query) {
                return res
                    .status(400)
                    .json({ error: "No search query provided" });
            }
            const posts = await postService.searchPosts(query);
            res.status(200).json(posts);
        } catch {
            res.status(500).json({ error: "Error searching posts" });
        }
    }

    async getMyPosts(req, res) {
        try {
          console.log(req.user.id); 
            const posts = await Post.find({ author: req.user.id });
            res.status(200).json(posts);
        } catch (error) {
            console.error("Error getting my posts:", error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

export default new PostController();
