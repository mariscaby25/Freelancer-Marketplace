import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as authService from '../services/authService';

export default function ForgotPassword() {
  const [form, setForm] = useState({ email: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (form.newPassword !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      await authService.resetPassword({ email: form.email, newPassword: form.newPassword });
      setSuccess('Password reset successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1800);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to reset password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Your Password</h2>
        <p style={{ color: '#6b7280', fontSize: '0.9rem', margin: '-6px 0 4px' }}>
          Enter your account email and choose a new password.
        </p>
        {error && <p className="form-error">{error}</p>}
        {success && <p className="form-success">{success}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="newPassword" type="password" placeholder="New Password" value={form.newPassword} onChange={handleChange} required minLength={6} />
        <input name="confirmPassword" type="password" placeholder="Confirm New Password" value={form.confirmPassword} onChange={handleChange} required minLength={6} />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        <p><Link to="/login">← Back to Login</Link></p>
      </form>
    </div>
  );
}