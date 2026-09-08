import React from 'react';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function FreelancerCard({ freelancer }) {
  const avatarSrc = freelancer.avatar_url ? `${API_BASE}${freelancer.avatar_url}` : null;

  return (
    <div className="freelancer-card">
      {avatarSrc ? (
        <img src={avatarSrc} alt={freelancer.name} className="freelancer-avatar" />
      ) : (
        <div className="freelancer-avatar freelancer-avatar-placeholder">
          {freelancer.name?.[0]}
        </div>
      )}
      <h3>{freelancer.name}</h3>
      <p className="freelancer-title">{freelancer.title}</p>
      <p className="freelancer-bio">{freelancer.bio?.slice(0, 100)}...</p>
      <div className="freelancer-meta">
        <span>${freelancer.hourly_rate}/hr</span>
        <span>{freelancer.location}</span>
      </div>
      <p className="freelancer-skills">{freelancer.skills}</p>
    </div>
  );
}