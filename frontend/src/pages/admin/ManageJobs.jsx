import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getAllJobsAdmin().then(setJobs).finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this job listing?')) return;
    await adminService.deleteJobAdmin(id);
    setJobs((prev) => prev.filter((j) => j.id !== id));
  };

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <h1>Manage Jobs</h1>
      <table className="data-table">
        <thead>
          <tr><th>Title</th><th>Client</th><th>Status</th><th>Budget</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id}>
              <td>{job.title}</td>
              <td>{job.client_name}</td>
              <td><span className={`status-badge status-${job.status}`}>{job.status}</span></td>
              <td>${job.budget_min}-${job.budget_max}</td>
              <td><button className="btn-link" onClick={() => handleDelete(job.id)}>Remove</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}