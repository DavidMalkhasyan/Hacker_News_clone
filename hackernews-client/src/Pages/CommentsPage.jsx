import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import Comment from "../Components/Comment";
import Footer from "../Components/Footer";
import "../styles/post.css";

const AllCommentsPage = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get(`/comments/all`);
                setComments(res.data);
            } catch (err) {
                console.error("Error fetching comments:", err);
            }
        };
        fetchComments();
    }, []);

    return (
        <>
            <Navbar />
            <div className="all-comments-page">
                <h2>All Comments</h2>
                {comments.length === 0 ? (
                    <p>No comments available.</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment-container">
                            <Comment
                                comment={comment}
                                depth={0}
                                onReplySubmit={() => {}} 
                                canReply={false}
                            />
                            <hr />
                        </div>
                    ))
                )}
            </div>
            <Footer />
        </>
    );
};

export default AllCommentsPage;
