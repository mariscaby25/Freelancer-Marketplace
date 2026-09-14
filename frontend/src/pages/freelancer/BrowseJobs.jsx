import React, { useEffect, useState } from 'react';
import JobCard from '../../components/JobCard';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import * as jobService from '../../services/jobService';
import '../../styles/sidebar.css';

export default function BrowseJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fieldId, setFieldId] = useState(null);

  const fetchJobs = (searchTerm = search, field = fieldId) => {
    setLoading(true);
    jobService
      .getAllJobs({ search: searchTerm, field_id: field || undefined })
      .then(setJobs)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchJobs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (term) => {
    setSearch(term);
    fetchJobs(term, fieldId);
  };

  const handleSelectField = (id) => {
    setFieldId(id);
    fetchJobs(search, id);
  };

  return (
    <div className="list-page">
      <h1>Find a Job</h1>
      <div className="sidebar-layout">
        <Sidebar selectedFieldId={fieldId} onSelectField={handleSelectField} />
        <div>
          <SearchBar onSearch={handleSearch} placeholder="Search by title or skill..." />
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
      </div>
    </div>
  );
}