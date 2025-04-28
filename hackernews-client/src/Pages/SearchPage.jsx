import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Navbar from "../Components/Navbar";
import PostItem from "../Components/PostItem";
import Footer from "../Components/Footer";

const SearchPage = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParam = urlParams.get("query");
    setQuery(queryParam);

    if (queryParam) {
      api
        .get(`/posts/search?query=${queryParam}`)
        .then((res) => setPosts(res.data))
        .catch((err) => console.error("Error searching posts:", err));
    }
  }, [window.location.search]);

  const handleHidePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
  };

  return (
    <div>
      <Navbar />
      <div style={{ padding: "1rem" }}>
        <h2>Search Results for "{query}"</h2>
        {posts.length === 0 ? (
          <div>No posts found</div>
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

export default SearchPage;
