import React, { useEffect, useState } from 'react';
import * as fieldService from '../services/fieldService';
import '../styles/sidebar.css';

export default function Sidebar({ selectedFieldId, onSelectField }) {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fieldService.getAllFields().then(setFields).finally(() => setLoading(false));
  }, []);

  return (
    <aside className="sidebar">
      <h3 className="sidebar-title">Browse by Field</h3>
      <button
        className={`sidebar-item ${!selectedFieldId ? 'active' : ''}`}
        onClick={() => onSelectField(null)}
      >
        <i className="fa-solid fa-layer-group"></i>
        <span>All Fields</span>
      </button>
      {loading ? (
        <p className="sidebar-loading">Loading...</p>
      ) : (
        fields.map((field) => (
          <button
            key={field.id}
            className={`sidebar-item ${selectedFieldId === field.id ? 'active' : ''}`}
            onClick={() => onSelectField(field.id)}
          >
            <i className={field.icon}></i>
            <span>{field.name}</span>
          </button>
        ))
      )}
    </aside>
  );
}