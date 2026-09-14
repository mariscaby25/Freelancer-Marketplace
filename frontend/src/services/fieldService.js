import api from './api';

export const getAllFields = () => api.get('/fields').then((r) => r.data);
export const createField = (data) => api.post('/fields', data).then((r) => r.data);
export const updateField = (id, data) => api.put(`/fields/${id}`, data).then((r) => r.data);
export const deleteField = (id) => api.delete(`/fields/${id}`).then((r) => r.data);