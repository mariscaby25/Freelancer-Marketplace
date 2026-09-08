import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as applicationService from '../../services/applicationService';

export default function FreelancerDashboard() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications().then(setApplications).finally(() => setLoading(false));
  }, []);

  const counts = applications.reduce(
    (acc, a) => ({ ...acc, [a.status]: (acc[a.status] || 0) + 1 }),
    {}
  );

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}</h1>
        <Link to="/freelancer/browse-jobs" className="btn-primary">Browse Jobs</Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card"><h3>{applications.length}</h3><p>Total Applications</p></div>
        <div className="stat-card"><h3>{counts.pending || 0}</h3><p>Pending</p></div>
        <div className="stat-card"><h3>{counts.accepted || 0}</h3><p>Accepted</p></div>
      </div>

      <section>
        <h2>Recent Applications</h2>
        {loading ? (
          <p>Loading...</p>
        ) : applications.length === 0 ? (
          <p>You haven't applied to any jobs yet. <Link to="/freelancer/browse-jobs">Browse open jobs</Link>.</p>
        ) : (
          <div className="job-list">
            {applications.slice(0, 5).map((app) => (
              <div key={app.id} className="job-row">
                <span>{app.job_title}</span>
                <span className={`status-badge status-${app.status}`}>{app.status}</span>
              </div>
            ))}
          </div>
        )}
        <Link to="/freelancer/my-applications">See all my applications →</Link>
      </section>
    </div>
  );
}