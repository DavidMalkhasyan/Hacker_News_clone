import React, { useState } from "react";
import api from "../utils/api";
import "../styles/post.css";

const Comment = ({ comment, depth = 0, onReplySubmit }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const username = localStorage.getItem("username");

    const handleReply = async (e) => {
        e.preventDefault();
        console.log("Replying to comment:", comment._id);
        console.log("Post ID:", comment.postId);
    
        if (!replyText.trim()) return;
    
        const token = localStorage.getItem("token");
    
        try {
            await api.post(
                `/comments/${comment.postId}/comments/${comment._id}/replies`,
                {
                    text: replyText,
                    postId: comment.postId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
    
            setReplyText("");
            setReplyOpen(false);
            if (onReplySubmit) onReplySubmit();
        } catch (err) {
            console.error("Error posting reply:", err);
        }
    };
    

    return (
        <div className="comment" style={{ marginLeft: depth * 20 }}>
            <div>
                <strong>{username || "Anonymous"}</strong>: {comment.text}
            </div>

            <button className="reply-button" onClick={() => setReplyOpen(!replyOpen)}>
                {replyOpen ? "Cancel" : "Reply"}
            </button>

            {replyOpen && (
                <form onSubmit={handleReply} className="reply-form">
                    <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder="Write a reply..."
                        rows={2}
                    />
                    <button type="submit">Submit Reply</button>
                </form>
            )}

            {comment.replies?.length > 0 &&
                comment.replies.map((reply) => (
                    <Comment
                        key={reply._id}
                        comment={reply}
                        depth={depth + 1}
                        onReplySubmit={onReplySubmit}
                    />
                ))}
        </div>
    );
};

export default Comment;
