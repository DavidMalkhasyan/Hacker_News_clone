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

  const buildCommentTree = (flatComments) => {
    const commentMap = {};
    const roots = [];

    flatComments.forEach(comment => {
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    flatComments.forEach(comment => {
      if (comment.parentId) {
        const parent = commentMap[comment.parentId];
        if (parent) {
          parent.replies.push(comment);
        }
      } else {
        roots.push(comment);
      }
    });

    return roots;
  };

  const fetchComments = () => {
    api.get(`/posts/${id}/comments`)
      .then(res => {
        const commentTree = buildCommentTree(res.data);
        setComments(commentTree);
      })
      .catch(err => console.error('Error fetching comments:', err));
  };

  useEffect(() => {
    api.get(`/posts/${id}`)
      .then(res => setPost(res.data))
      .catch(err => console.error('Error fetching post:', err));

    fetchComments();
  }, [id]);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = (event) => {
    event.preventDefault();

    if (newComment.trim()) {
      const token = localStorage.getItem("token");

      api.post(`posts/${id}/comments`, { text: newComment }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(() => {
          setNewComment('');
          fetchComments(); 
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
            onReplySubmit={fetchComments}
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
