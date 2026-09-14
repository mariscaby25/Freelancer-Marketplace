import React, { useEffect, useState } from 'react';
import * as fieldService from '../../services/fieldService';

export default function ManageFields() {
  const [fields, setFields] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', icon: '' });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');

  const loadFields = () => {
    setLoading(true);
    fieldService.getAllFields().then(setFields).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadFields();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (editingId) {
        await fieldService.updateField(editingId, form);
      } else {
        await fieldService.createField(form);
      }
      setForm({ name: '', icon: '' });
      setEditingId(null);
      loadFields();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save field.');
    }
  };

  const handleEdit = (field) => {
    setEditingId(field.id);
    setForm({ name: field.name, icon: field.icon });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setForm({ name: '', icon: '' });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this field? Freelancers assigned to it will be unassigned.')) return;
    await fieldService.deleteField(id);
    loadFields();
  };

  return (
    <div className="list-page">
      <h1>Manage Fields</h1>

      <form className="job-form" onSubmit={handleSubmit} style={{ marginBottom: '24px', maxWidth: '500px' }}>
        {error && <p className="form-error">{error}</p>}
        <input name="name" placeholder="Field name (e.g. Software Development)" value={form.name} onChange={handleChange} required />
        <input name="icon" placeholder="Font Awesome icon class (e.g. fa-solid fa-code)" value={form.icon} onChange={handleChange} required />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button type="submit" className="btn-primary">{editingId ? 'Update Field' : 'Add Field'}</button>
          {editingId && <button type="button" className="btn-secondary" onClick={handleCancelEdit}>Cancel</button>}
        </div>
      </form>

      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Icon</th><th>Name</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {fields.map((field) => (
              <tr key={field.id}>
                <td><i className={field.icon}></i></td>
                <td>{field.name}</td>
                <td>
                  <button className="btn-link" onClick={() => handleEdit(field)}>Edit</button>{' '}
                  <button className="btn-link" onClick={() => handleDelete(field.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}