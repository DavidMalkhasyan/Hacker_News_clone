import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username'); 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/auth');
  };

  return (
    <div className="navbar">
      <div>
        <Link to="/">Hacker News</Link>
        <Link to="/welcome">welcome</Link>
        <Link to="/new">New</Link>
        <Link to="/threads">threads</Link>
        <Link to="/past">past</Link>
        <Link to="/comments">comments</Link>
        {/* <Link to="/ask">ask</Link>
        <Link to="/show">show</Link>
        <Link to="/job">job</Link> */}
        <Link to="/submit">submit</Link>
      </div>
      
      <div>
        {isLoggedIn ? (
          <>
            <span>{username} (1)</span>
            <span onClick={handleLogout}>logout</span>
          </>
        ) : (
          <Link to="/auth">login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
