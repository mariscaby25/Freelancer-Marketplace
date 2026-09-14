import React, { useEffect, useState } from 'react';
import ClientCard from '../../components/ClientCard';
import SearchBar from '../../components/SearchBar';
import * as clientService from '../../services/clientService';
import '../../styles/jobs.css';

export default function BrowseClients() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = (search = '') => {
    setLoading(true);
    clientService.getAllClients({ search }).then(setClients).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="list-page">
      <h1>Find Clients</h1>
      <SearchBar onSearch={fetchClients} placeholder="Search by name..." />
      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : clients.length === 0 ? (
        <p>No clients found.</p>
      ) : (
        <div className="job-grid">
          {clients.map((c) => (
            <ClientCard key={c.id} client={c} />
          ))}
        </div>
      )}
    </div>
  );
}