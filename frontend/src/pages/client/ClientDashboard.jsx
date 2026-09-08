import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as jobService from '../../services/jobService';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getMyJobs().then(setJobs).finally(() => setLoading(false));
  }, []);

  const openCount = jobs.filter((j) => j.status === 'open').length;
  const inProgressCount = jobs.filter((j) => j.status === 'in_progress').length;

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}</h1>
        <Link to="/client/post-job" className="btn-primary">+ Post a New Job</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card"><h3>{jobs.length}</h3><p>Total Jobs Posted</p></div>
        <div className="stat-card"><h3>{openCount}</h3><p>Open Jobs</p></div>
        <div className="stat-card"><h3>{inProgressCount}</h3><p>In Progress</p></div>
      </div>

      <section>
        <h2>Your Recent Jobs</h2>
        {loading ? (
          <p>Loading...</p>
        ) : jobs.length === 0 ? (
          <p>You haven't posted any jobs yet. <Link to="/client/post-job">Post one now</Link>.</p>
        ) : (
          <div className="job-list">
            {jobs.slice(0, 5).map((job) => (
              <div key={job.id} className="job-row">
                <span>{job.title}</span>
                <span className={`status-badge status-${job.status}`}>{job.status}</span>
                <Link to={`/client/jobs/${job.id}`}>View Applications</Link>
              </div>
            ))}
          </div>
        )}
        <Link to="/client/my-jobs">See all my jobs →</Link>
      </section>
    </div>
  );
}