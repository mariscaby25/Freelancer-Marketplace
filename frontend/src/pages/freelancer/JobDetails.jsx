import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as jobService from '../../services/jobService';

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getJobById(id).then(setJob).finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="page-loading">Loading...</p>;
  if (!job) return <p>Job not found.</p>;

  return (
    <div className="details-page">
      <div className="dashboard-header">
        <h1>{job.title}</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          {job.status === 'open' && (
            <Link to={`/freelancer/jobs/${job.id}/apply`} className="btn-primary">Apply Now</Link>
          )}
          <Link to={`/messages/${job.client_id}`} className="btn-secondary">Message Client</Link>
        </div>
      </div>
      <span className={`status-badge status-${job.status}`}>{job.status}</span>
      <p>{job.description}</p>
      <div className="job-card-meta">
        <span>Category: {job.category}</span>
        <span>Skills: {job.skills_required}</span>
        <span>Budget: ${job.budget_min} - ${job.budget_max} ({job.budget_type})</span>
        <span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</span>
        <span>Posted by: {job.client_name}</span>
      </div>
    </div>
  );
}