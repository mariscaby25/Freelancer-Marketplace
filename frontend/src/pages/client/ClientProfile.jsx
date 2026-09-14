import React, { useState } from 'react';
import AvatarUpload from '../../components/AvatarUpload';
import { useAuth } from '../../context/AuthContext';
import '../../styles/profile.css';

export default function ClientProfile() {
  const { user, updateUser } = useAuth();
  const [message, setMessage] = useState('');

  const handleAvatarUpload = (avatarUrl) => {
    updateUser({ avatar_url: avatarUrl });
    setMessage('Photo updated!');
  };

  return (
    <div className="profile-page">
      <h1>My Profile</h1>
      <AvatarUpload
        currentAvatarUrl={user?.avatar_url}
        onUploadSuccess={handleAvatarUpload}
      />
      {message && <p className="form-success">{message}</p>}
      <div className="profile-card">
        <div className="profile-field"><label>Name</label><p>{user?.name}</p></div>
        <div className="profile-field"><label>Email</label><p>{user?.email}</p></div>
        <div className="profile-field"><label>Account Type</label><p>Client</p></div>
        <div className="profile-field">
          <label>Member Since</label>
          <p>{user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}