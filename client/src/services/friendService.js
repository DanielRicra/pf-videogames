import { api } from './api';

export const getPendingFriendRequests = async (userEmail) => {
  try {
    const encodedEmail = encodeURIComponent(userEmail);
    const response = await api.get(`/friend/pending/${encodedEmail}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pending friend requests');
  }
};