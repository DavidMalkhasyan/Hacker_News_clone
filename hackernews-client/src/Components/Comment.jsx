import React, { useState } from "react";
import api from "../utils/api";
import "../styles/post.css";

const Comment = ({ comment, depth = 0, onReplySubmit }) => {
    const [replyOpen, setReplyOpen] = useState(false);
    const [replyText, setReplyText] = useState("");
    const [error, setError] = useState(""); 

    const handleReply = async (e) => {
        e.preventDefault();

        if (!replyText.trim()) {
            setError("Reply text cannot be empty.");
            return;
        }

        const token = localStorage.getItem("token");
        if (!token) {
            setError("You must be logged in to reply.");
            return;
        }

        try {
            await api.post(
                `/comments/${comment.postId}/comments/${comment._id}/replies`,
                { text: replyText },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setReplyText("");
            setReplyOpen(false);
            setError("");
            if (onReplySubmit) onReplySubmit();
        } catch (err) {
            console.error("Error posting reply:", err);
            setError("An error occurred while posting your reply. Please try again.");
        }
    };

    return (
        <div className="comment" style={{ marginLeft: depth * 20 }}>
            <div>
                <strong>{comment?.username || "Anonymous"}</strong>: {comment.text}
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

            {error && <div className="error-message">{error}</div>}

            {comment.replies && comment.replies.length > 0 &&
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
