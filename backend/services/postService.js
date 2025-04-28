import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

class PostService {
  async createPost({ title, content, url, author }) {
    return await Post.create({ title, content, url, author });
  }

  async getPostsByType(type) {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const tomorrowStart = new Date(todayStart);
    tomorrowStart.setDate(tomorrowStart.getDate() + 1);

    let filter = {};
    if (type === "old") {
      filter.createdAt = { $lt: todayStart };
    } else if (type === "today") {
      filter.createdAt = { $gte: todayStart, $lt: tomorrowStart };
    }

    return await Post.find(filter)
        .populate('author', 'username') 
        .sort({ createdAt: -1 });
}


async getPostById(id) {
  return await Post.findById(id).populate('author', 'username');
}

  async updatePost(id, { title, content }) {
    return await Post.findByIdAndUpdate(id, { title, content }, { new: true });
  }

  async deletePost(id) {
    return await Post.findByIdAndDelete(id);
  }

  async deleteAllPosts() {
    return await Post.deleteMany({});
  }

  async createComment({ postId, text, author }) {
    const post = await Post.findById(postId);
    if (!post) return null;

    const comment = new Comment({ text, postId, author });
    await comment.save();

    post.comments.push(comment._id);
    await post.save();

    return comment;
  }

  async getComments(postId) {
    const post = await Post.findById(postId).populate("comments");
    return post?.comments || null;
  }

  async searchPosts(query) {
    return await Post.find({ title: { $regex: query, $options: "i" } })
      .populate("author", "username")
      .sort({ createdAt: -1 });
  }
  
}

export default new PostService();
