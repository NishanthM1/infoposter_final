import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import "../App.css";
import Modal from './Modal';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export function Header() {
  return (
    <div className="header">
      <div className="header-brand" >
        <img src={logo} alt="Infoposter Logo" className="header-logo" />
        <span className="header-title">Infoposter</span>
      
      </div>
      {/* Temporarily removed header-actions to debug click issues */}
      {/* <div className="header-actions">
        <div className="user-avatar">L</div>
      </div> */}
    </div>
  );
}

export function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // Keep this for switching
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/'); // Redirect to home after logout
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
    navigate('/'); // Redirect to home after login
  };

  const handleRegisterSuccess = () => {
    setIsAuthenticated(true);
    setShowRegisterModal(false);
    navigate('/'); // Redirect to home after registration
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  const openRegisterModal = () => { // This will be called from LoginForm
    setShowRegisterModal(true);
    setShowLoginModal(false); // Close login modal if open
  };

  const closeRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const switchToRegister = () => { // Called from LoginForm
    openRegisterModal();
  };

  const switchToLogin = () => { // Called from RegisterForm
    closeRegisterModal();
    openLoginModal();
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/" className="nav-link-button">
          Home
        </Link>
        <Link to="/saved" className="nav-link-button">
          Saved
        </Link>
      </div>
      <div className="navbar-actions">
        {isAuthenticated ? (
          <>
            <Link to="/create" className="nav-link-button">
              Create
            </Link>
            <button onClick={handleLogout} className="nav-link-button">
              Logout
            </button>
          </>
        ) : (
          <button onClick={openLoginModal} className="nav-link-button">
            Login
          </button>
        )}
      </div>

      <Modal show={showLoginModal} onClose={closeLoginModal} title="Welcome to Infoposter">
        <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToRegister={switchToRegister} setIsAuthenticated={setIsAuthenticated} />
      </Modal>

      <Modal show={showRegisterModal} onClose={closeRegisterModal} title="Create New Account">
        <RegisterForm onRegisterSuccess={handleRegisterSuccess} onSwitchToLogin={switchToLogin} setIsAuthenticated={setIsAuthenticated} />
      </Modal>
    </nav>
  );
}
