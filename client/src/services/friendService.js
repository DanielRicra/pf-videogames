import { api } from './api';

export const getPendingFriendRequests = async (userEmail) => {
  try {
    const response = await api.get(`/friend/pending/${userEmail}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching pending friend requests');
  }
};