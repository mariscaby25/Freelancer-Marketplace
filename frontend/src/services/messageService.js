import api from './api';

export const sendMessage = (data) => api.post('/messages', data).then((r) => r.data);
export const getConversation = (userId) => api.get(`/messages/${userId}`).then((r) => r.data);
export const getInbox = () => api.get('/messages/inbox').then((r) => r.data);
export const getUnreadCount = () => api.get('/messages/unread-count').then((r) => r.data);