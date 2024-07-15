// src/components/Header.js
import React from 'react';
import { Auth } from 'aws-amplify';
import { useNavigate } from 'react-router-dom';
import './Header.css';  // Import the CSS file for the header

function Header({ userName, isAuthenticated }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await Auth.signOut();
      navigate('/login');  // Redirect to the login page after logout
      window.location.reload(); // Force a reload to ensure the state is updated
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <a href="/" className="nav-link">Home</a>
          <a href="/product" className="nav-link">Product</a>
          <a href="/orders" className="nav-link">Orders</a>
        </div>
        <div className="nav-right">
          {isAuthenticated && <h1 className="welcome-message">Welcome, {userName && `${userName}님`}</h1>}
          {isAuthenticated && <button onClick={handleLogout} className="logout-button">Logout</button>}
        </div>
      </nav>
    </header>
  );
}

export default Header;
