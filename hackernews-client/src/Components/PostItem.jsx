import React from "react";
import { Link } from "react-router-dom";
import "../styles/PostItem.css";

const PostItem = ({ post, index }) => {
    return (
        <div className="post-item">
            <span className="post-index">{index}. </span>
            {post.url ? (
                <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="post-title"
                >
                    {post.title}
                </a>
            ) : (
                <span className="post-title">{post.title}</span>
            )}

            <div className="post-meta">
                {post.points || 0} points |{" "}
                <Link to={`/posts/${post._id}`} className="post-comments-link">
                    {post.comments?.length || 0} comments
                </Link>
            </div>
        </div>
    );
};

export default PostItem;
