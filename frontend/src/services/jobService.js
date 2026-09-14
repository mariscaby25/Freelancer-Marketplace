import api from './api';

export const getAllJobs = (params) => api.get('/jobs', { params }).then((r) => r.data);
export const getJobById = (id) => api.get(`/jobs/${id}`).then((r) => r.data);
export const getMyJobs = () => api.get('/jobs/my-jobs').then((r) => r.data);
export const createJob = (data) => api.post('/jobs', data).then((r) => r.data);
export const updateJob = (id, data) => api.put(`/jobs/${id}`, data).then((r) => r.data);
export const deleteJob = (id) => api.delete(`/jobs/${id}`).then((r) => r.data);