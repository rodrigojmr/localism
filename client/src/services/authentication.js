import axios from 'axios';
import jsonToFormData from './parseFormData';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/authentication`,
  withCredentials: true
});

export const signUp = body => {
  const formData = jsonToFormData(body);

  // Object.keys(body).forEach(key =>
  //   body[key] ? formBody.append(key, body[key]) : formBody.append(key, '')
  // );
  // for (let property in body) {
  //   formBody.append(property, body[property]);
  // }
  return api.post('/sign-up', formData).then(response => response.data);
};

export const signIn = body =>
  api.post('/sign-in', body).then(response => response.data);

export const signOut = () =>
  api.post('/sign-out').then(response => response.data);

export const loadMe = () => api.get('/me').then(response => response.data);

export const confirmEmail = token =>
  api.get(`/confirmation/${token}`).then(response => response.data);
