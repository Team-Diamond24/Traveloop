import apiClient from '../lib/apiClient';

export const getAllCities = async (filters = {}) => {
  try {
    const params = new URLSearchParams(filters).toString();
    const response = await apiClient.get(`/cities?${params}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const searchCities = async (query) => {
  try {
    const response = await apiClient.get(`/cities/search?q=${query}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getCityById = async (id) => {
  try {
    const response = await apiClient.get(`/cities/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
