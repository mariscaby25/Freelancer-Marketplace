import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

export default function Reports() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getReports().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <h1>Platform Reports</h1>
      <table className="data-table">
        <tbody>
          <tr><td>Total Clients</td><td>{stats.total_clients}</td></tr>
          <tr><td>Total Freelancers</td><td>{stats.total_freelancers}</td></tr>
          <tr><td>Total Jobs Posted</td><td>{stats.total_jobs}</td></tr>
          <tr><td>Open Jobs</td><td>{stats.open_jobs}</td></tr>
          <tr><td>Completed Jobs</td><td>{stats.completed_jobs}</td></tr>
          <tr><td>Total Applications</td><td>{stats.total_applications}</td></tr>
          <tr><td>Accepted Applications</td><td>{stats.accepted_applications}</td></tr>
        </tbody>
      </table>
    </div>
  );
}