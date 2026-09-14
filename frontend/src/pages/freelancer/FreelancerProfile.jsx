import React, { useEffect, useState } from 'react';
import AvatarUpload from '../../components/AvatarUpload';
import { useAuth } from '../../context/AuthContext';
import * as freelancerService from '../../services/freelancerService';
import * as fieldService from '../../services/fieldService';
import '../../styles/profile.css';

export default function FreelancerProfile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({
    title: '', bio: '', skills: '', hourly_rate: '', portfolio_url: '',
    location: '', years_experience: '', field_id: '',
  });
  const [fields, setFields] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fieldService.getAllFields().then(setFields);
    freelancerService
      .getMyFreelancerProfile()
      .then((profile) => setForm((prev) => ({ ...prev, ...profile })))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleAvatarUpload = (avatarUrl) => {
    updateUser({ avatar_url: avatarUrl });
    setMessage('Photo updated!');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    try {
      await freelancerService.upsertFreelancerProfile(form);
      setMessage('Profile saved successfully!');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to save profile.');
    }
  };

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="form-page">
      <h1>My Freelancer Profile</h1>
      <AvatarUpload
        currentAvatarUrl={user?.avatar_url}
        onUploadSuccess={handleAvatarUpload}
      />
      {message && <p className="form-success">{message}</p>}
      <form className="job-form" onSubmit={handleSubmit}>
        <label>Field of Work</label>
        <select name="field_id" value={form.field_id || ''} onChange={handleChange}>
          <option value="">Select your field...</option>
          {fields.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
        <input name="title" placeholder="Professional Title (e.g. Full-Stack Developer)" value={form.title || ''} onChange={handleChange} />
        <textarea name="bio" placeholder="Bio" rows={5} value={form.bio || ''} onChange={handleChange} />
        <input name="skills" placeholder="Skills (comma-separated)" value={form.skills || ''} onChange={handleChange} />
        <div className="form-row">
          <input name="hourly_rate" type="number" placeholder="Hourly Rate ($)" value={form.hourly_rate || ''} onChange={handleChange} />
          <input name="years_experience" type="number" placeholder="Years of Experience" value={form.years_experience || ''} onChange={handleChange} />
        </div>
        <input name="location" placeholder="Location" value={form.location || ''} onChange={handleChange} />
        <input name="portfolio_url" placeholder="Portfolio URL" value={form.portfolio_url || ''} onChange={handleChange} />
        <button type="submit" className="btn-primary">Save Profile</button>
      </form>
    </div>
  );
}