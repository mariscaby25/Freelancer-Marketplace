import api from './api';

export const getAllUsers = (params) => api.get('/admin/users', { params }).then((r) => r.data);
export const updateUserStatus = (id, status) => api.put(`/admin/users/${id}/status`, { status }).then((r) => r.data);
export const deleteUser = (id) => api.delete(`/admin/users/${id}`).then((r) => r.data);
export const getAllJobsAdmin = () => api.get('/admin/jobs').then((r) => r.data);
export const deleteJobAdmin = (id) => api.delete(`/admin/jobs/${id}`).then((r) => r.data);
export const getAllApplicationsAdmin = () => api.get('/admin/applications').then((r) => r.data);
export const getReports = () => api.get('/admin/reports').then((r) => r.data);