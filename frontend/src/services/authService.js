import api from './api';

export const register = (data) => api.post('/auth/register', data).then((r) => r.data);
export const login = (data) => api.post('/auth/login', data).then((r) => r.data);
export const getProfile = () => api.get('/auth/me').then((r) => r.data);
export const resetPassword = (data) => api.post('/auth/reset-password', data).then((r) => r.data);

export const uploadAvatar = (file) => {
  const formData = new FormData();
  formData.append('avatar', file);
  return api.post('/auth/upload-avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then((r) => r.data);
};