import React, { useState } from 'react';
import * as authService from '../services/authService';

const API_BASE = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');

export default function AvatarUpload({ currentAvatarUrl, onUploadSuccess }) {
  const [preview, setPreview] = useState(currentAvatarUrl ? `${API_BASE}${currentAvatarUrl}` : null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError('');
    setPreview(URL.createObjectURL(file)); // instant local preview
    setUploading(true);

    try {
      const result = await authService.uploadAvatar(file);
      onUploadSuccess(result.avatar_url);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to upload image.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="avatar-upload">
      <div className="avatar-upload-preview">
        {preview ? (
          <img src={preview} alt="Profile" />
        ) : (
          <div className="avatar-upload-placeholder">No photo</div>
        )}
      </div>
      <label className="btn-secondary avatar-upload-label">
        {uploading ? 'Uploading...' : 'Change Photo'}
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp,image/gif"
          onChange={handleFileChange}
          disabled={uploading}
          style={{ display: 'none' }}
        />
      </label>
      {error && <p className="form-error">{error}</p>}
    </div>
  );
}