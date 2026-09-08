import React, { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import * as jobService from '../../services/jobService';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchJobs = (search = '') => {
    setLoading(true);
    jobService.getAllJobs({ search }).then(setJobs).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div className="list-page">
      <h1>Browse Open Jobs</h1>
      <SearchBar onSearch={fetchJobs} placeholder="Search by title or skill..." />
      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <div className="job-grid">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}