import React, { useEffect, useState } from 'react';
import ApplicationCard from '../../components/ApplicationCard';
import * as applicationService from '../../services/applicationService';

export default function MyApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getMyApplications().then(setApplications).finally(() => setLoading(false));
  }, []);

  const handleWithdraw = async (id) => {
    if (!window.confirm('Withdraw this application?')) return;
    const updated = await applicationService.withdrawApplication(id);
    setApplications((prev) => prev.map((a) => (a.id === id ? { ...a, status: updated.status } : a)));
  };

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <h1>My Applications</h1>
      {applications.length === 0 ? (
        <p>You haven't applied to any jobs yet.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id}>
              <ApplicationCard application={app} />
              {app.status === 'pending' && (
                <button className="btn-link" onClick={() => handleWithdraw(app.id)}>Withdraw</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}