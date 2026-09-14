import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as jobService from '../../services/jobService';
import * as fieldService from '../../services/fieldService';
import '../../styles/postjob.css';

const TIPS = [
  'Write a clear, specific job title.',
  'Describe the scope and deliverables in detail.',
  'List the exact skills required for the job.',
  'Set a realistic budget range for the work.',
  'Include a deadline to attract serious applicants.',
];

const REASONS = [
  'Access thousands of vetted freelancers.',
  'Post jobs for free with no hidden charges.',
  'Message applicants directly, no middlemen.',
  'Track every application in one dashboard.',
  'Built-in tools to manage your entire project.',
];

export default function PostJob() {
  const [form, setForm] = useState({
    title: '', description: '', category: '', skills_required: '',
    budget_min: '', budget_max: '', budget_type: 'fixed', deadline: '', field_id: '',
  });
  const [fields, setFields] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fieldService.getAllFields().then(setFields);
  }, []);

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
    <div className="postjob-page">
      <div className="postjob-banner">
        <img src="/images/postAJob.png" alt="Post a Job" />
      </div>

      <div className="postjob-layout">
        <div className="postjob-form-col">
          <h1>Post a New Job</h1>
          {error && <p className="form-error">{error}</p>}
          <form className="job-form" onSubmit={handleSubmit}>
            <label>Field</label>
            <select name="field_id" value={form.field_id} onChange={handleChange} required>
              <option value="">Select a field...</option>
              {fields.map((f) => (
                <option key={f.id} value={f.id}>{f.name}</option>
              ))}
            </select>
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

        <div className="postjob-side-col">
          <div className="postjob-tip-card">
            <h3><i className="fa-solid fa-lightbulb"></i> Tips for a Great Job Post</h3>
            <ul>
              {TIPS.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>

          <div className="postjob-tip-card">
            <h3><i className="fa-solid fa-star"></i> Why Post With Us</h3>
            <ul>
              {REASONS.map((reason, i) => (
                <li key={i}>{reason}</li>
              ))}
            </ul>
          </div>

          <div className="postjob-sticker">
            <i className="fa-solid fa-heart"></i>
            <p>We're glad to work for you!</p>
          </div>
        </div>
      </div>
    </div>
  );
}