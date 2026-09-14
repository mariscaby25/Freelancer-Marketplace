import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import * as jobService from '../../services/jobService';

// Client-side view of their own posted job (read-only overview + link to applications)
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
        <Link to={`/client/jobs/${job.id}/applications`} className="btn-primary">View Applications</Link>
      </div>
      <span className={`status-badge status-${job.status}`}>{job.status}</span>
      <p>{job.description}</p>
      <div className="job-card-meta">
        <span>Category: {job.category}</span>
        <span>Skills: {job.skills_required}</span>
        <span>
          Budget: ${job.budget_min} - ${job.budget_max} ({job.budget_type})
        </span>
        <span>Deadline: {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'N/A'}</span>
      </div>
    </div>
  );
}