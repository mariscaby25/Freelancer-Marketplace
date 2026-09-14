import React, { useEffect, useState } from 'react';
import * as applicationService from '../../services/applicationService';

const STAGES = ['pending', 'shortlisted', 'accepted'];

export default function ApplicationTracker() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications().then(setApplications).finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="tracker-page">
      <h1>Application Tracker</h1>
      {applications.length === 0 ? (
        <p>No applications to track yet.</p>
      ) : (
        applications.map((app) => {
          const stageIndex = app.status === 'rejected' || app.status === 'withdrawn'
            ? -1
            : STAGES.indexOf(app.status);
          return (
            <div key={app.id} className="tracker-item">
              <div className="tracker-item-header">
                <h3>{app.job_title}</h3>
                <span>{app.client_name}</span>
              </div>
              {stageIndex === -1 ? (
                <span className={`status-badge status-${app.status}`}>{app.status}</span>
              ) : (
                <div className="tracker-steps">
                  {STAGES.map((stage, i) => (
                    <div key={stage} className={`tracker-step ${i <= stageIndex ? 'completed' : ''}`}>
                      <div className="tracker-dot" />
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}