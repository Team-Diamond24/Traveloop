import apiClient from '../lib/apiClient';

export const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await apiClient.post('/auth/login', credentials);
    if (response.data.success) {
      localStorage.setItem('token', response.data.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await apiClient.post('/auth/forgot-password', { email });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
