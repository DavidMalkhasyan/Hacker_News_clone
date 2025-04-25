import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import PostItem from "../Components/PostItem";

const NewPage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        api.get("/posts/?type=today")
            .then((res) => setPosts(res.data))
            .catch((err) => console.error("Error fetching posts:", err));
    }, []);

    return (
        <div>
            <Navbar />
            <div style={{ padding: "1rem" }}>
                {posts.map((post, idx) => (
                    <PostItem key={post._id} post={post} index={idx + 1} />
                ))}
            </div>
        </div>
    );
};

export default NewPage;
