import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [about, setAbout] = useState("");
    const [email, setEmail] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    navigate("/login");
                    return;
                }

                const res = await api.get("/auth/profile", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setAbout(res.data.about || "");
                setEmail(res.data.email || "");
            } catch (err) {
                console.error("Profile load Error:", err);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.patch(
                "/auth/profile",
                { about, email },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
        } catch (err) {
            console.error("Profile update error:", err);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmPassword) {
            alert("New passwords do not match!");
            return;
        }
        try {
            const token = localStorage.getItem("token");
            await api.post(
                "/auth/change-password",
                {
                    oldPassword,
                    newPassword,
                },
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Password change error:", err);
            alert("Error changing password.");
        }
    };

    if (!user) return <div>Loading...</div>;

    return (
        <>
            <Navbar />
            <div className="profile-page" style={{ padding: "20px" }}>
                <h2>Profile: {user.username}</h2>

                <form onSubmit={handleUpdateProfile}>
                    <div>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows={5}
                            placeholder="About you..."
                        />
                    </div>
                    <div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Your email..."
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>

                <h3>Change Password</h3>
                <form onSubmit={handleChangePassword}>
                    <div>
                        <input
                            type="password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            placeholder="Old password"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="New password"
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm new password"
                        />
                    </div>
                    <button type="submit">Change Password</button>
                </form>

                <h3>My Content</h3>
                <div style={{ marginTop: "10px" }}>
                    <button onClick={() => navigate("/my-posts")}>
                        My Posts
                    </button>
                    <button onClick={() => navigate("/my-comments")}>
                        My Comments
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
