import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";

const posts = [
    { id: 1, title: "AI Startup School" },
    { id: 2, title: "React and Redux" },
    { id: 3, title: "Building Web Apps with Node.js" },
];

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get("query");
    const [results, setResults] = useState([]);

    useEffect(() => {
        if (query) {
            const filteredPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setResults(filteredPosts);
        }
    }, [query]);

    return (
        <div>
            <Navbar />
            <h2>Search Results for: "{query}"</h2>
            {results.length > 0 ? (
                <ul>
                    {results.map((post) => (
                        <li key={post.id}>{post.title}</li>
                    ))}
                </ul>
            ) : (
                <p>No results found</p>
            )}
            <Footer />
        </div>
    );
};

export default SearchPage;
