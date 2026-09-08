import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jobService from '../../services/jobService';

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', description: '', category: '', skills_required: '',
    budget_min: '', budget_max: '', budget_type: 'fixed', deadline: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const job = await jobService.createJob(form);
      navigate(`/client/jobs/${job.id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to post job.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1>Post a New Job</h1>
      {error && <p className="form-error">{error}</p>}
      <form className="job-form" onSubmit={handleSubmit}>
        <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} required />
        <textarea name="description" placeholder="Job Description" rows={6} value={form.description} onChange={handleChange} required />
        <input name="category" placeholder="Category (e.g. Web Development)" value={form.category} onChange={handleChange} />
        <input name="skills_required" placeholder="Skills required (comma-separated)" value={form.skills_required} onChange={handleChange} />

        <div className="form-row">
          <select name="budget_type" value={form.budget_type} onChange={handleChange}>
            <option value="fixed">Fixed Price</option>
            <option value="hourly">Hourly</option>
          </select>
          <input name="budget_min" type="number" placeholder="Min Budget" value={form.budget_min} onChange={handleChange} />
          <input name="budget_max" type="number" placeholder="Max Budget" value={form.budget_max} onChange={handleChange} />
        </div>

        <label>Deadline</label>
        <input name="deadline" type="date" value={form.deadline} onChange={handleChange} />

        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Posting...' : 'Post Job'}
        </button>
      </form>
    </div>
  );
}