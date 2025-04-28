import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const MyCommentsPage = () => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyComments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const res = await api.get("/comments/my-comments", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setComments(res.data);
      } catch (err) {
        console.error("Error loading comments:", err);
      }
    };

    fetchMyComments();
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="my-comments-page">
        <h2>My Comments</h2>
        {comments.length === 0 ? (
          <p>You haven't written any comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="comment">
              <p>{comment.text}</p>
              {}
              <small>Post: {comment.postTitle}</small>
            </div>
          ))
        )}
      </div>
      <Footer />
    </>
  );
};

export default MyCommentsPage;
