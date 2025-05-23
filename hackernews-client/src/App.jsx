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
import CommentsPage from "./Pages/CommentsPage";
import ProfilePage from "./Pages/ProfilePage";
import SearchPage from "./Pages/SearchPage";
import GuidelinesPage from "./Pages/GuidelinesPage";
import FAQPage from "./Pages/FAQPage";
import SecurityPage from "./Pages/SecurityPage";
import MyPostsPage from "./Pages/MyPostsPage";
import MyCommentsPage from "./Pages/MyCommentsPage";

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
                <Route
                    path="/auth"
                    element={
                        <AuthPage setIsAuthenticated={setIsAuthenticated} />
                    }
                />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/new" element={<NewPage />} />
                <Route path="/past" element={<PastPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/guidelines" element={<GuidelinesPage />} />
                <Route path="/faq" element={<FAQPage />} />
                <Route path="/security" element={<SecurityPage />} />
                <Route
                    path="/submit"
                    element={
                        isAuthenticated ? (
                            <SubmitPage />
                        ) : (
                            <Navigate to="/auth" />
                        )
                    }
                />
                <Route
                    path="/comments"
                    element={
                        isAuthenticated ? (
                            <CommentsPage />
                        ) : (
                            <Navigate to="/auth" />
                        )
                    }
                />
                <Route
                    path="/profile"
                    element={
                        isAuthenticated ? (
                            <ProfilePage />
                        ) : (
                            <Navigate to="/auth" />
                        )
                    }
                />

                <Route path="/my-posts" element={<MyPostsPage />} />
                <Route path="/my-comments" element={<MyCommentsPage />} />
            </Routes>
        </Router>
    );
};

export default App;
