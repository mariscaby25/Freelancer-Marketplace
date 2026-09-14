import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as jobService from '../../services/jobService';

export default function MyJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getMyJobs().then(setJobs).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this job listing?')) return;
    await jobService.deleteJob(id);
    setJobs(jobs.filter((j) => j.id !== id));
  };

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <div className="dashboard-header">
        <h1>My Jobs</h1>
        <Link to="/client/post-job" className="btn-primary">+ Post a New Job</Link>
      </div>
      {jobs.length === 0 ? (
        <p>You haven't posted any jobs yet.</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Title</th><th>Status</th><th>Budget</th><th>Posted</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.title}</td>
                <td><span className={`status-badge status-${job.status}`}>{job.status}</span></td>
                <td>${job.budget_min}-${job.budget_max}</td>
                <td>{new Date(job.created_at).toLocaleDateString()}</td>
                <td>
                  <Link to={`/client/jobs/${job.id}`}>Applications</Link>{' '}
                  <button className="btn-link" onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}