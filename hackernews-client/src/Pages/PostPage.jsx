import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../Components/Navbar';
import '../styles/post.css';

const renderComments = (comments, depth = 0) => {
  if (!comments || comments.length === 0) {
    return <div>No comments yet</div>;
  }
  return comments.map(comment => (
    <div key={comment._id} className="comment" style={{ marginLeft: depth * 20 }}>
      <div><strong>{comment.author}</strong>: {comment.text}</div>
      {comment.children && renderComments(comment.children, depth + 1)}
    </div>
  ));
};

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));
  }, [id]);

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <Navbar />
      <div className="post-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <h4>Comments:</h4>
        {renderComments(post.comments || [])}
      </div>
    </div>
  );
};

export default PostPage;
