import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Footer.css";

const Footer = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
        }
    };

    return (
        <div className="footer">
            <hr className="footer-line" />
            <div className="footer-content">
                <p className="footer-announcement">
                    Join us for{" "}
                    <a
                        href="https://events.ycombinator.com/ai-sus"
                        target="_blank"
                    >
                        AI Startup School
                    </a>{" "}
                    this June 16-17 in San Francisco!
                </p>
                <div className="footer-links">
                    <Link to="/guidelines">Guidelines</Link> |
                    <Link to="/faq">FAQ</Link> |
                    <Link to="/lists">Lists</Link> |
                    <Link to="https://github.com/HackerNews/API">API</Link> |
                    <Link to="/security">Security</Link> |
                    <Link to="https://www.ycombinator.com/legal/">Legal</Link>
                    <Link to="https://www.ycombinator.com/apply/">Apply to YC </Link> |
                    <Link to="mailto:contact@example.com">Contact</Link> |
                </div>
                <form onSubmit={handleSearch} className="footer-search">
                    <label>
                        Search:{" "}
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Footer;
