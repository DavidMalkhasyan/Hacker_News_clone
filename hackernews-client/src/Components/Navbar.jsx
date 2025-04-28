import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");
    const username = localStorage.getItem("username");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/auth");
    };

    return (
        <div className="navbar">
            <div>
                <Link to="/"> Hacker News </Link> 
                <Link to="/welcome"> Welcome |</Link> 
                <Link to="/new"> New |</Link> 
                <Link to="/past"> Past |</Link>  
                <Link to="/comments"> Comments |</Link>  
                <Link to="/submit"> Submit </Link> 
            </div>

            <div>
                {isLoggedIn ? (
                    <>
                        <Link to="/profile">{username}</Link>
                        <span onClick={handleLogout}>Logout</span>
                    </>
                ) : (
                    <Link to="/auth">Login</Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;
