import axios from 'axios';
import jsonToFormData from './parseFormData';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/authentication`,
  withCredentials: true
});

export const signUp = async body => {
  const formData = jsonToFormData(body);

  try {
    const response = await api.post('/sign-up', formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const signIn = body =>
  api.post('/sign-in', body).then(response => response.data);

export const signOut = () =>
  api.post('/sign-out').then(response => response.data);

export const loadMe = () => api.get('/me').then(response => response.data);

export const loadUser = () =>
  api.get('/me/full').then(response => response.data);

export const confirmEmail = token =>
  api.get(`/confirmation/${token}`).then(response => response.data);
