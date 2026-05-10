import apiClient from '../lib/apiClient';

// --- Core Trip Operations ---

export const getAllTrips = async () => {
  try {
    const response = await apiClient.get('/trips');
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const createTrip = async (tripData) => {
  try {
    const response = await apiClient.post('/trips', tripData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTripById = async (id) => {
  try {
    const response = await apiClient.get(`/trips/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTrip = async (id, tripData) => {
  try {
    const response = await apiClient.put(`/trips/${id}`, tripData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteTrip = async (id) => {
  try {
    const response = await apiClient.delete(`/trips/${id}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const shareTrip = async (id, shareData) => {
  try {
    const response = await apiClient.post(`/trips/${id}/share`, shareData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPublicTrip = async (token) => {
  try {
    const response = await apiClient.get(`/trips/public/${token}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// --- Trip Stops & Activities ---

export const getTripStops = async (tripId) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/stops`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addTripStop = async (tripId, stopData) => {
  try {
    const response = await apiClient.post(`/trips/${tripId}/stops`, stopData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTripStop = async (tripId, stopId, stopData) => {
  try {
    const response = await apiClient.put(`/trips/${tripId}/stops/${stopId}`, stopData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteTripStop = async (tripId, stopId) => {
  try {
    const response = await apiClient.delete(`/trips/${tripId}/stops/${stopId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addActivityToStop = async (tripId, stopId, activityData) => {
  try {
    const response = await apiClient.post(`/trips/${tripId}/stops/${stopId}/activities`, activityData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const removeActivityFromStop = async (tripId, stopId, activityId) => {
  try {
    const response = await apiClient.delete(`/trips/${tripId}/stops/${stopId}/activities/${activityId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// --- Budget, Packing, Notes ---

export const getTripBudget = async (tripId) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/budget`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTripBudget = async (tripId, budgetData) => {
  try {
    const response = await apiClient.put(`/trips/${tripId}/budget`, budgetData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getBudgetAlerts = async (tripId) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/budget/alerts`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getPackingList = async (tripId) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/packing`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addPackingItem = async (tripId, itemData) => {
  try {
    const response = await apiClient.post(`/trips/${tripId}/packing`, itemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updatePackingItem = async (tripId, itemId, itemData) => {
  try {
    const response = await apiClient.put(`/trips/${tripId}/packing/${itemId}`, itemData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deletePackingItem = async (tripId, itemId) => {
  try {
    const response = await apiClient.delete(`/trips/${tripId}/packing/${itemId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getTripNotes = async (tripId) => {
  try {
    const response = await apiClient.get(`/trips/${tripId}/notes`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const addTripNote = async (tripId, noteData) => {
  try {
    const response = await apiClient.post(`/trips/${tripId}/notes`, noteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateTripNote = async (tripId, noteId, noteData) => {
  try {
    const response = await apiClient.put(`/trips/${tripId}/notes/${noteId}`, noteData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteTripNote = async (tripId, noteId) => {
  try {
    const response = await apiClient.delete(`/trips/${tripId}/notes/${noteId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
