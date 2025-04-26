import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "../styles/post.css";

const AllCommentsPage = () => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await api.get("/comments/all");
                setComments(res.data);
            } catch (err) {
                console.error("Error in uploading:", err);
            }
        };
        fetchComments();
    }, []);

    return (
        <>
            <Navbar />
            <div className="all-comments-page">
                <h2>ВAll comments</h2>
                {comments.length === 0 ? (
                    <p>ther is no comments</p>
                ) : (
                    comments.map((comment) => (
                        <div key={comment._id} className="comment">
                            <p>
                                <strong>{comment.author?.username || "anonymus"}:</strong>{" "}
                                {comment.text}
                            </p>
                            <p className="comment-time">
                                {new Date(comment.createdAt).toLocaleString()}
                            </p>
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
