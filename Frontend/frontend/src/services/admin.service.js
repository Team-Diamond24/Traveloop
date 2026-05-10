import apiClient from '../lib/apiClient';

export const getAdminStats = async () => {
  try {
    const response = await apiClient.get('/admin/stats');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllUsersAdmin = async () => {
  try {
    const response = await apiClient.get('/admin/users');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getAllTripsAdmin = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/admin/trips?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
