import React, { useEffect, useState } from 'react';
import * as adminService from '../../services/adminService';

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [roleFilter, setRoleFilter] = useState('');
  const [loading, setLoading] = useState(true);

  const loadUsers = () => {
    setLoading(true);
    adminService.getAllUsers(roleFilter ? { role: roleFilter } : {}).then(setUsers).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleFilter]);

  const toggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'suspended' : 'active';
    await adminService.updateUserStatus(user.id, newStatus);
    setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, status: newStatus } : u)));
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Permanently delete this user?')) return;
    await adminService.deleteUser(id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <div className="list-page">
      <h1>Manage Users</h1>
      <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
        <option value="">All Roles</option>
        <option value="client">Clients</option>
        <option value="freelancer">Freelancers</option>
        <option value="admin">Admins</option>
      </select>
      {loading ? (
        <p className="page-loading">Loading...</p>
      ) : (
        <table className="data-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td><span className={`status-badge status-${u.status}`}>{u.status}</span></td>
                <td>
                  <button className="btn-link" onClick={() => toggleStatus(u)}>
                    {u.status === 'active' ? 'Suspend' : 'Activate'}
                  </button>{' '}
                  <button className="btn-link" onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}