import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";
import "../styles/auth.css";

const AuthPage = ({ setIsAuthenticated }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate(); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin ? "/auth/login" : "/auth/register";

        try {
            const res = await api.post(url, { username, password });
            setMessage(
                isLogin ? "Login successful!" : "Registration successful!"
            );

            if (isLogin) {
                console.log("Login response:", res.data);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", username);
                setIsAuthenticated(true);
                navigate("/");
            }
            setPassword("");
        } catch (err) {
            setMessage(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="auth-container">
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <p>
                {isLogin
                    ? "Don't have an account?"
                    : "Already have an account?"}{" "}
                <button onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? "Register here" : "Login here"}
                </button>
            </p>
            {message && <p className="auth-message">{message}</p>}
        </div>
    );
};

export default AuthPage;
