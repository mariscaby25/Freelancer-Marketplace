import api from './api';

export const applyToJob = (data) => api.post('/applications', data).then((r) => r.data);
export const getMyApplications = () => api.get('/applications/my-applications').then((r) => r.data);
export const getApplicationsForJob = (jobId) => api.get(`/applications/job/${jobId}`).then((r) => r.data);
export const updateApplicationStatus = (id, status) =>
  api.put(`/applications/${id}/status`, { status }).then((r) => r.data);
export const withdrawApplication = (id) => api.put(`/applications/${id}/withdraw`).then((r) => r.data);