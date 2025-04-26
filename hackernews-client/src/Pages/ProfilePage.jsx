import React, { useEffect, useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [about, setAbout] = useState("");
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
            } catch (err) {
                console.error("Profile load Error:", err);
            }
        };
        fetchProfile();
    }, [navigate]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            await api.patch("/auth/profile", { about }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert("Profile Update!");
        } catch (err) {
            console.error("Profile Update error:", err);
        }
    };

    if (!user) return <div>Load ...</div>;

    return (
        <>
            <Navbar />
            <div className="profile-page">
                <h2>Profile {user.username}</h2>
                <form onSubmit={handleUpdate}>
                    <div>
                        <textarea
                            value={about}
                            onChange={(e) => setAbout(e.target.value)}
                            rows={5}
                            placeholder="About you..."
                        />
                    </div>
                    <button type="submit">Update</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default ProfilePage;
