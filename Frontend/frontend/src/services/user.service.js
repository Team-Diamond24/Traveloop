import apiClient from '../lib/apiClient';

export const getMe = async () => {
  try {
    const response = await apiClient.get('/users/me');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateMe = async (formData) => {
  try {
    // Check if formData is an instance of FormData (for file uploads)
    const headers = formData instanceof FormData 
      ? { 'Content-Type': 'multipart/form-data' } 
      : {};
    
    const response = await apiClient.put('/users/me', formData, { headers });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await apiClient.delete('/users/me');
    localStorage.clear();
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getSavedDestinations = async () => {
  try {
    const response = await apiClient.get('/users/me/saved-destinations');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const saveDestination = async (cityId) => {
  try {
    const response = await apiClient.post('/users/me/saved-destinations', { city_id: cityId });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeSavedDestination = async (id) => {
  try {
    const response = await apiClient.delete(`/users/me/saved-destinations/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
