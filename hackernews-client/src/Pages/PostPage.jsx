import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../Components/Navbar';
import Comment from '../Components/Comment'; 
import '../styles/post.css';

const PostPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');  

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));
    
    api.get(`/posts/${id}/comments`)
      .then(res => setComments(res.data))
      .catch(err => console.error('Error fetching comments:', err));
  }, [id]); 
  
  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };
  
  const handleCommentSubmit = (event) => {
    event.preventDefault(); 
    
    if (newComment.trim()) {
      api.post(`posts/${id}/comments`, { text: newComment })
        .then(res => {
          setComments(prevComments => [...prevComments, res.data]);
          setNewComment(''); 
        })
        .catch(err => console.error('Error adding comment:', err));
    }
  };

  if (!post) return <div>Loading...</div>;
  
  return (
    <div>
      <Navbar />
      <div className="post-container">
        <h2>{post.title}</h2>
        <p>{post.content}</p>

        <h4>Comments:</h4>

        {comments.map((comment) => (
          <Comment
            key={comment._id}
            comment={comment}
            depth={0}
          />
        ))}

        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Write a comment..."
            rows="4"
            cols="50"
            required
          ></textarea>
          <button type="submit">Submit Comment</button>
        </form>
      </div>
    </div>
  );
};

export default PostPage;
