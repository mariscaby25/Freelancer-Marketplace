import api from './api';

export const getAllClients = (params) => api.get('/clients', { params }).then((r) => r.data);