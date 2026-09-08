import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import '../styles/navbar.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { unreadCount } = useMessages();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const dashboardLink =
    user?.role === 'client' ? '/client/dashboard'
    : user?.role === 'freelancer' ? '/freelancer/dashboard'
    : user?.role === 'admin' ? '/admin/dashboard'
    : '/';

  const profileLink =
    user?.role === 'client' ? '/client/profile'
    : user?.role === 'freelancer' ? '/freelancer/profile'
    : null;

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">FreelanceHub</Link>
      <div className="navbar-links">
        <Link to="/freelancer/browse-jobs">Find Work</Link>
        <Link to="/freelancers">Find Talent</Link>
        {user ? (
          <>
            <Link to={dashboardLink}>Dashboard</Link>
            {profileLink && <Link to={profileLink}>My Profile</Link>}
            <Link to="/messages" className="navbar-messages">
              Messages
              {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
            </Link>
            <button className="btn-link" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}