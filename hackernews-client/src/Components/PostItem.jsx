import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/PostItem.css";

const PostItem = ({ post, index, onHide }) => {
  const [hidden, setHidden] = useState(false);

  const handleHide = () => {
    setHidden(true);
    if (onHide) {
      onHide(post._id);
    }
  };

  if (hidden) return null;

  const formattedDate = new Date(post.createdAt).toLocaleDateString();
  const authorName = post.author?.username || "unknown";

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
        </Link>{" "}
        | by {authorName} on {formattedDate}
      </div>

      <button onClick={handleHide} className="hide-button">
        Hide
      </button>
    </div>
  );
};

export default PostItem;
