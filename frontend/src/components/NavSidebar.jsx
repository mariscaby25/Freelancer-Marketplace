import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useMessages } from '../context/MessageContext';
import '../styles/navsidebar.css';

const FREELANCER_TIPS = [
  'Complete your profile to attract more clients.',
  'Fast responses win more gigs.',
  'A profile photo builds instant trust.',
  'Message clients before applying — it helps!',
];

const CLIENT_TIPS = [
  'Clear job descriptions attract better talent.',
  'Message freelancers to discuss details early.',
  'Review applications quickly to secure top talent.',
  'Set a realistic budget for better applicants.',
];

export default function NavSidebar() {
  const { user } = useAuth();
  const { unreadCount } = useMessages();
  const location = useLocation();
  const [tipIndex, setTipIndex] = useState(0);

  const tips = user?.role === 'freelancer' ? FREELANCER_TIPS : CLIENT_TIPS;

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [tips.length]);

  if (!user || (user.role !== 'client' && user.role !== 'freelancer')) return null;

  const dashboardLink = user.role === 'client' ? '/client/dashboard' : '/freelancer/dashboard';
  const isActive = (path) => location.pathname === path;

  return (
    <aside className="nav-sidebar">
      <Link to={dashboardLink} className={`nav-sidebar-item ${isActive(dashboardLink) ? 'active' : ''}`}>
        <i className="fa-solid fa-gauge"></i> Dashboard
      </Link>

      {user.role === 'freelancer' && (
        <>
          <Link to="/freelancer/browse-jobs" className={`nav-sidebar-item ${isActive('/freelancer/browse-jobs') ? 'active' : ''}`}>
            <i className="fa-solid fa-magnifying-glass"></i> Find a Job
          </Link>
          <Link to="/clients" className={`nav-sidebar-item ${isActive('/clients') ? 'active' : ''}`}>
            <i className="fa-solid fa-user-tie"></i> Find Clients
          </Link>
          <Link to="/freelancer/my-applications" className={`nav-sidebar-item ${isActive('/freelancer/my-applications') ? 'active' : ''}`}>
            <i className="fa-solid fa-list-check"></i> My Applications
          </Link>
        </>
      )}

      {user.role === 'client' && (
        <>
          <Link to="/freelancers" className={`nav-sidebar-item ${isActive('/freelancers') ? 'active' : ''}`}>
            <i className="fa-solid fa-magnifying-glass"></i> Find Freelancers
          </Link>
          <Link to="/client/post-job" className={`nav-sidebar-item ${isActive('/client/post-job') ? 'active' : ''}`}>
            <i className="fa-solid fa-plus"></i> Post a Job
          </Link>
          <Link to="/client/my-jobs" className={`nav-sidebar-item ${isActive('/client/my-jobs') ? 'active' : ''}`}>
            <i className="fa-solid fa-briefcase"></i> My Jobs
          </Link>
        </>
      )}

      <Link to="/messages" className={`nav-sidebar-item ${isActive('/messages') ? 'active' : ''}`}>
        <i className="fa-solid fa-comment"></i> Messages
        {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </Link>

      <div className="nav-sidebar-cta">
        <p className="nav-sidebar-cta-blink">
          {user.role === 'freelancer' ? 'Ready for your next gig?' : 'Need help with a project?'}
        </p>
        {user.role === 'freelancer' ? (
          <Link to="/freelancer/browse-jobs" className="btn-primary">Find a Job</Link>
        ) : (
          <Link to="/client/post-job" className="btn-primary">Post a Job</Link>
        )}
      </div>

      <div className="nav-sidebar-filler">
        <p key={tipIndex} className="nav-sidebar-vertical-word">
          {tips[tipIndex]}
        </p>
      </div>

      <div className="nav-sidebar-sticker">
        <img src="/images/welcome-sticker.png" alt="Welcome - Work, Grow, Earn, Enjoy" />
      </div>
    </aside>
  );
}