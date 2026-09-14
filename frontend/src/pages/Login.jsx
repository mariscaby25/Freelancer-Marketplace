import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const user = await login(form);
      const dest =
        user.role === 'client' ? '/client/dashboard'
        : user.role === 'freelancer' ? '/freelancer/dashboard'
        : '/admin/dashboard';
      navigate(dest);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Log In</h2>
        {error && <p className="form-error">{error}</p>}
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <div style={{ textAlign: 'right', marginTop: '-8px' }}>
          <Link to="/forgot-password" style={{ fontSize: '0.85rem', color: '#4f46e5' }}>Forgot password?</Link>
        </div>
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        <p>Don't have an account? <Link to="/register">Sign up</Link></p>
      </form>
    </div>
  );
}