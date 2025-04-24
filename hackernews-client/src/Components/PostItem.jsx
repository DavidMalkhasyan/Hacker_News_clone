import React from 'react';
import { Link } from 'react-router-dom';

const PostItem = ({ post, index }) => {
  return (
    <div style={{ marginBottom: 10 }}>
      <span>{index}. </span>
      <Link to={`/posts/${post._id}`} style={{ color: '#000', fontWeight: 'bold' }}>{post.title}</Link>
      <div style={{ fontSize: '0.85rem', color: '#666' }}>
        {post.points || 0} points | {post.comments?.length || 0} comments
      </div>
    </div>
  );
};

export default PostItem;
