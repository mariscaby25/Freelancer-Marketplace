import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ApplicationCard from '../../components/ApplicationCard';
import * as applicationService from '../../services/applicationService';

export default function ViewApplications() {
  const { id: jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    applicationService.getApplicationsForJob(jobId).then(setApplications).finally(() => setLoading(false));
  }, [jobId]);

  const handleStatusChange = async (appId, status) => {
    const updated = await applicationService.updateApplicationStatus(appId, status);
    setApplications((prev) => prev.map((a) => (a.id === appId ? { ...a, status: updated.status } : a)));
  };

  if (loading) return <p className="page-loading">Loading...</p>;

  return (
    <div className="list-page">
      <div className="dashboard-header">
        <h1>Applications</h1>
        <Link to={`/client/jobs/${jobId}`}>← Back to job</Link>
      </div>
      {applications.length === 0 ? (
        <p>No applications yet for this job.</p>
      ) : (
        <div className="application-list">
          {applications.map((app) => (
            <div key={app.id}>
              <ApplicationCard application={app} onStatusChange={handleStatusChange} showActions />
              <Link to={`/messages/${app.freelancer_id}`} className="btn-secondary">
                Message {app.freelancer_name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}