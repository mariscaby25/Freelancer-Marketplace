import api from './api';

export const getAllFreelancers = (params) => api.get('/freelancers', { params }).then((r) => r.data);
export const getMyFreelancerProfile = () => api.get('/freelancers/me').then((r) => r.data);
export const getFreelancerByUserId = (userId) => api.get(`/freelancers/${userId}`).then((r) => r.data);
export const upsertFreelancerProfile = (data) => api.put('/freelancers/me', data).then((r) => r.data);