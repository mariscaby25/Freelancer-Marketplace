import React, { useEffect, useState } from 'react';
import FreelancerCard from '../../components/FreelancerCard';
import SearchBar from '../../components/SearchBar';
import Sidebar from '../../components/Sidebar';
import * as freelancerService from '../../services/freelancerService';
import '../../styles/jobs.css';

export default function BrowseFreelancers() {
  const [freelancers, setFreelancers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [fieldId, setFieldId] = useState(null);

  const fetchFreelancers = (searchTerm = search, field = fieldId) => {
    setLoading(true);
    freelancerService
      .getAllFreelancers({ search: searchTerm, field_id: field || undefined })
      .then(setFreelancers)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchFreelancers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (term) => {
    setSearch(term);
    fetchFreelancers(term, fieldId);
  };

  const handleSelectField = (id) => {
    setFieldId(id);
    fetchFreelancers(search, id);
  };

  return (
    <div className="list-page">
      <h1>Find Talent</h1>
      <div className="sidebar-layout">
        <Sidebar selectedFieldId={fieldId} onSelectField={handleSelectField} />
        <div>
          <SearchBar onSearch={handleSearch} placeholder="Search by name or title..." />
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
      </div>
    </div>
  );
}