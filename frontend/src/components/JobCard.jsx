import React from 'react';
import { Link } from 'react-router-dom';

export default function JobCard({ job }) {
  return (
    <div className="job-card">
      <div className="job-card-header">
        <h3>{job.title}</h3>
        <span className={`status-badge status-${job.status}`}>{job.status.replace('_', ' ')}</span>
      </div>
      <p className="job-card-desc">{job.description?.slice(0, 140)}...</p>
      <div className="job-card-meta">
        <span>{job.category}</span>
        <span>
          {job.budget_type === 'hourly'
            ? `$${job.budget_min}-$${job.budget_max}/hr`
            : `$${job.budget_min}-$${job.budget_max}`}
        </span>
      </div>
      <p className="job-card-skills">{job.skills_required}</p>
      <div className="job-card-footer">
        <span>Posted by {job.client_name}</span>
        <Link to={`/freelancer/jobs/${job.id}`} className="btn-secondary">View Details</Link>
      </div>
    </div>
  );
}