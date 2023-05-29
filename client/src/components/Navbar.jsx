import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/navbar.css';
import userIcon from "../assets/svg/user.svg"


const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const token = localStorage.removeItem('user')
      navigate('/login')
  };


  return (
    <nav className="navbar">
      <div className="navbar-logo">
        Auth App
      </div>
      <div className="navbar-dropdown">
        <button className="dropdown-button">
          <img src={userIcon} alt="User Logo" />
        </button>

        <div className="dropdown-content">
          <div className='items-container'>
            <Link to={"/profile"}><p>Profile</p></Link>
            <Link to={"/setting"}> <p>Settings</p></Link>
            <div onClick={handleLogout}><p>Logout</p></div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
