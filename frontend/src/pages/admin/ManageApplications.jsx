import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

export default function ManageApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllApplicationsAdmin().then(setApplications).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <h1>Manage Applications</h1>
      <table className="data-table">
        <thead>
          <tr><th>Job</th><th>Freelancer</th><th>Client</th><th>Status</th><th>Applied</th></tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr key={app.id}>
              <td>{app.job_title}</td>
              <td>{app.freelancer_name}</td>
              <td>{app.client_name}</td>
              <td><span className={`status-badge status-${app.status}`}>{app.status}</span></td>
              <td>{new Date(app.applied_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}