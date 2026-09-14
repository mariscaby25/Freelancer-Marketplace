import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as applicationService from '../../services/applicationService';

export default function ApplyJob() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ cover_letter: '', proposed_rate: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await applicationService.applyToJob({ job_id: jobId, ...form });
      navigate('/freelancer/my-applications');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1>Apply for this Job</h1>
      {error && <p className="form-error">{error}</p>}
      <form className="job-form" onSubmit={handleSubmit}>
        <textarea
          name="cover_letter"
          placeholder="Write a short cover letter explaining why you're a great fit..."
          rows={6}
          value={form.cover_letter}
          onChange={handleChange}
          required
        />
        <input
          name="proposed_rate"
          type="number"
          placeholder="Your Proposed Rate ($)"
          value={form.proposed_rate}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
    </div>
  );
}