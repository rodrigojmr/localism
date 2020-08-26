import axios from 'axios';
import jsonToFormData from './parseFormData';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/authentication`,
  withCredentials: true
});

export const loadUser = () => api.get('/me/full').then(response => response.data);

// Load profiles here
export const loadProfile = id => api.get(`/profile/${id}`).then(response => response.data);

export const deletePlace = id => api.delete(`/profile/${id}`).then(response => response.data);

export const editPlace = body => api.patch(`/profile`, body).then(response => response.data);
