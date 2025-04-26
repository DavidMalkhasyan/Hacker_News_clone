import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import PostItem from "../Components/PostItem";
import Footer from "../Components/Footer";

const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/posts")
            .then((res) => setPosts(res.data))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    const handleHidePost = (postId) => {
        setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    };

    return (
        <div>
            <Navbar />
            <div style={{ padding: "1rem" }}>
                {posts.length === 0 ? (
                    <div>No posts available</div>
                ) : (
                    posts.map((post, idx) => (
                        <PostItem 
                            key={post._id} 
                            post={post} 
                            index={idx + 1} 
                            onHide={handleHidePost}
                        />
                    ))
                )}
            </div>
            <Footer />
        </div>
    );
};

export default HomePage;
