import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import '../styles/navbar.css';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useMessages();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/login');
  };

  const profileLink =
    user?.role === 'client' ? '/client/profile'
    : user?.role === 'freelancer' ? '/freelancer/profile'
    : null;

  const avatarSrc = user?.avatar_url ? `${API_BASE}${user.avatar_url}` : null;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">FreelanceHub</Link>

      <div className="navbar-right">
        {user && (
          <Link to="/messages" className="navbar-icon-btn" aria-label="Messages">
            <i className="fa-solid fa-comment"></i>
            {unreadCount > 0 && <span className="badge navbar-icon-badge">{unreadCount}</span>}
          </Link>
        )}

        <div className="navbar-menu" ref={menuRef}>
          <button className="navbar-menu-trigger" onClick={() => setMenuOpen((v) => !v)}>
            {user ? (
              <>
                {avatarSrc ? (
                  <img src={avatarSrc} alt={user.name} className="navbar-avatar-img" />
                ) : (
                  <span className="navbar-avatar-circle">{user.name?.[0]}</span>
                )}
                <span>{user.name?.split(' ')[0]}</span>
              </>
            ) : (
              <span>Menu</span>
            )}
            <i className={`fa-solid fa-chevron-${menuOpen ? 'up' : 'down'}`}></i>
          </button>

          {menuOpen && (
            <div className="navbar-dropdown">
              {user ? (
                <>
                  {profileLink && (
                    <Link to={profileLink} onClick={() => setMenuOpen(false)}>
                      <i className="fa-solid fa-user"></i> My Profile
                    </Link>
                  )}
                  <button className="navbar-dropdown-logout" onClick={handleLogout}>
                    <i className="fa-solid fa-right-from-bracket"></i> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setMenuOpen(false)}>
                    <i className="fa-solid fa-right-to-bracket"></i> Login
                  </Link>
                  <Link to="/register" onClick={() => setMenuOpen(false)}>
                    <i className="fa-solid fa-user-plus"></i> Sign Up
                  </Link>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}