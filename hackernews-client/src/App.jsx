import React, { useEffect, useState } from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import AuthPage from "./Pages/AuthPage";
import HomePage from "./Pages/HomePage";
import PostPage from "./Pages/PostPage";
import WelcomePage from "./Pages/Welcome";
import NewPage from "./Pages/NewPage";
import PastPage from "./Pages/PastPage";
import SubmitPage from "./Pages/SubmitPage";
import Comment from "./Pages/CommentsPage";

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/new" element={<NewPage />} />
                <Route path="/past" element={<PastPage />} />
                <Route path="/submit" element={ isAuthenticated ? (<SubmitPage />) : (<Navigate to="/auth" />)} />
                <Route path="/comments" element={<Comment />} />
            </Routes>
        </Router>
    );
};

export default App;
