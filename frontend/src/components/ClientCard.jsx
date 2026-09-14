import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function ClientCard({ client }) {
  const { user } = useAuth();
  const avatarSrc = client.avatar_url ? `${API_BASE}${client.avatar_url}` : null;
  const isOwnCard = user?.id === client.id;

  return (
    <div className="freelancer-card">
      {avatarSrc ? (
        <img src={avatarSrc} alt={client.name} className="freelancer-avatar" />
      ) : (
        <div className="freelancer-avatar freelancer-avatar-placeholder">
          {client.name?.[0]}
        </div>
      )}
      <h3>{client.name}</h3>
      <p className="freelancer-title">Client</p>
      <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
        Member since {new Date(client.created_at).toLocaleDateString()}
      </p>
      {user && !isOwnCard && (
        <Link to={`/messages/${client.id}`} className="freelancer-message-btn">
          Message {client.name?.split(' ')[0]}
        </Link>
      )}
    </div>
  );
}