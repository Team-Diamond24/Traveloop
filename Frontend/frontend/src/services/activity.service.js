import apiClient from '../lib/apiClient';

export const getActivities = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/activities?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getActivityById = async (id) => {
  try {
    const response = await apiClient.get(`/activities/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
