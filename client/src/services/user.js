import axios from 'axios';
import jsonToFormData from './parseFormData';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

export const loadUser = () => api.get('/me/full').then(response => response.data);

// Load profiles here
export const loadProfile = id => api.get(`/profile/${id}`).then(response => response.data);

export const deleteProfile = id => api.delete(`/profile/${id}`).then(response => response.data);

export const editProfile = async (id, body) => {
  const formData = jsonToFormData(body);
  try {
    const response = await api.patch(`/profile/${id}`, formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
