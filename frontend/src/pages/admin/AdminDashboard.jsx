import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import * as adminService from '../../services/adminService';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminService.getReports().then(setStats).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      <div className="dashboard-stats">
        <div className="stat-card"><h3>{stats.total_clients}</h3><p>Clients</p></div>
        <div className="stat-card"><h3>{stats.total_freelancers}</h3><p>Freelancers</p></div>
        <div className="stat-card"><h3>{stats.total_jobs}</h3><p>Total Jobs</p></div>
        <div className="stat-card"><h3>{stats.open_jobs}</h3><p>Open Jobs</p></div>
        <div className="stat-card"><h3>{stats.total_applications}</h3><p>Applications</p></div>
        <div className="stat-card"><h3>{stats.accepted_applications}</h3><p>Accepted</p></div>
      </div>
      <div className="admin-nav-links">
        <Link to="/admin/users" className="btn-secondary">Manage Users</Link>
        <Link to="/admin/jobs" className="btn-secondary">Manage Jobs</Link>
        <Link to="/admin/applications" className="btn-secondary">Manage Applications</Link>
        <Link to="/admin/reports" className="btn-secondary">Full Reports</Link>
      </div>
    </div>
  );
}