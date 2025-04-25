import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import Comment from "../Components/Comment";
import "../styles/post.css";

const PostPage = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        api.get(`/posts/${id}`).then((res) => setPost(res.data));
        fetchComments();
    }, [id]);

    const fetchComments = () => {
        api.get(`/posts/${id}/comments`)
            .then((res) => setComments(res.data))
            .catch((err) => console.error("Error fetching comments:", err));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            await api.post(`/posts/${id}/comments`, { text: newComment });
            setNewComment("");
            fetchComments();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    if (!post) return <div>Loading...</div>;

    return (
        <div>
            <Navbar />
            <div className="post-container">
                <h2>{post.title}</h2>
                <p>{post.content}</p>

                <form onSubmit={handleSubmit} className="comment-form">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write a comment..."
                        rows={3}
                    />
                    <button type="submit">Post Comment</button>
                </form>

                <h4>Comments:</h4>
                {comments.length > 0 ? (
                    comments.map((comment) => (
                        <Comment key={comment._id} comment={comment} onReplySubmit={fetchComments} />
                    ))
                ) : (
                    <div>No comments yet</div>
                )}
            </div>
        </div>
    );
};

export default PostPage;
