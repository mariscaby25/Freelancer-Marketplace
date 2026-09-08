import React, { useEffect, useState } from 'react';
import FreelancerCard from '../../components/FreelancerCard';
import SearchBar from '../../components/SearchBar';
import * as freelancerService from '../../services/freelancerService';
import '../../styles/jobs.css';

export default function BrowseFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFreelancers = (search = '') => {
    setLoading(true);
    freelancerService.getAllFreelancers({ search }).then(setFreelancers).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFreelancers();
  }, []);

  return (
    <div className="list-page">
      <h1>Find Talent</h1>
      <SearchBar onSearch={fetchFreelancers} placeholder="Search by name or title..." />
      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : freelancers.length === 0 ? (
        <p>No freelancers found.</p>
      ) : (
        <div className="job-grid">
          {freelancers.map((f) => (
            <FreelancerCard key={f.id} freelancer={f} />
          ))}
        </div>
      )}
    </div>
  );
}