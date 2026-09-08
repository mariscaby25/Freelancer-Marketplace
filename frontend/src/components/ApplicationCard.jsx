import React from 'react';

const STATUS_COLORS = {
  pending: 'status-pending',
  shortlisted: 'status-shortlisted',
  accepted: 'status-accepted',
  rejected: 'status-rejected',
  withdrawn: 'status-withdrawn',
};

export default function ApplicationCard({ application, onStatusChange, showActions }) {
  return (
    <div className="application-card">
      <div className="application-card-header">
        <h4>{application.job_title}</h4>
        <span className={`status-badge ${STATUS_COLORS[application.status]}`}>
          {application.status}
        </span>
      </div>
      <p>{application.freelancer_name ? `Applicant: ${application.freelancer_name}` : `Client: ${application.client_name}`}</p>
      {application.proposed_rate && <p>Proposed rate: ${application.proposed_rate}</p>}
      {application.cover_letter && <p className="cover-letter">{application.cover_letter}</p>}

      {showActions && application.status === 'pending' && (
        <div className="application-actions">
          <button className="btn-primary" onClick={() => onStatusChange(application.id, 'shortlisted')}>
            Shortlist
          </button>
          <button className="btn-primary" onClick={() => onStatusChange(application.id, 'accepted')}>
            Accept
          </button>
          <button className="btn-danger" onClick={() => onStatusChange(application.id, 'rejected')}>
            Reject
          </button>
        </div>
      )}
    </div>
  );
}