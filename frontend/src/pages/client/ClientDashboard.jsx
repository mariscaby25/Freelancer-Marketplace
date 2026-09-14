import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import * as jobService from '../../services/jobService';
import * as freelancerService from '../../services/freelancerService';
import * as fieldService from '../../services/fieldService';
import FreelancerCard from '../../components/FreelancerCard';
import Banner from '../../components/Banner';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [freelancers, setFreelancers] = useState([]);
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    jobService.getMyJobs().then(setJobs).finally(() => setLoading(false));
    freelancerService.getAllFreelancers().then((data) => setFreelancers(data.slice(0, 3)));
    fieldService.getAllFields().then((data) => setFields(data.slice(0, 6)));
  }, []);

  const openCount = jobs.filter((j) => j.status === 'open').length;
  const inProgressCount = jobs.filter((j) => j.status === 'in_progress').length;

  return (
    <>
      <Banner />
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

        <section className="dashboard-people-section">
          <div className="dashboard-header">
            <h2>Popular Fields</h2>
            <Link to="/freelancers" className="btn-secondary">Browse More</Link>
          </div>
          <p style={{ color: 'var(--muted)', marginTop: '-14px' }}>Find the right talent for your next project.</p>
          <div className="field-square-grid">
            {fields.map((f) => (
              <Link to="/freelancers" key={f.id} className="field-square">
                <i className={f.icon}></i>
                <span>{f.name}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="dashboard-people-section">
          <div className="dashboard-header">
            <h2>Meet Freelancers</h2>
            <Link to="/freelancers" className="btn-secondary">Browse More</Link>
          </div>
          {freelancers.length === 0 ? (
            <p>No freelancers to show yet.</p>
          ) : (
            <div className="job-grid">
              {freelancers.map((f) => (
                <FreelancerCard key={f.id} freelancer={f} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}