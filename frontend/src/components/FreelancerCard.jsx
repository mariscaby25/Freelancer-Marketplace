import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function FreelancerCard({ freelancer }) {
  const { user } = useAuth();
  const avatarSrc = freelancer.avatar_url ? `${API_BASE}${freelancer.avatar_url}` : null;
  const isOwnCard = user?.id === freelancer.user_id;

  return (
    <div className="freelancer-card">
      {avatarSrc ? (
        <img src={avatarSrc} alt={freelancer.name} className="freelancer-avatar" />
      ) : (
        <div className="freelancer-avatar freelancer-avatar-placeholder">
          {freelancer.name?.[0]}
        </div>
      )}
      {freelancer.field_name && (
        <span className="freelancer-field-badge">
          <i className={freelancer.field_icon}></i> {freelancer.field_name}
        </span>
      )}
      <h3>{freelancer.name}</h3>
      <p className="freelancer-title">{freelancer.title}</p>
      <p className="freelancer-bio">{freelancer.bio?.slice(0, 100)}...</p>
      <div className="freelancer-meta">
        <span>${freelancer.hourly_rate}/hr</span>
        <span>{freelancer.location}</span>
      </div>
      <p className="freelancer-skills">{freelancer.skills}</p>
      {user && !isOwnCard && (
        <Link to={`/messages/${freelancer.user_id}`} className="freelancer-message-btn">
          Message {freelancer.name?.split(' ')[0]}
        </Link>
      )}
    </div>
  );
}