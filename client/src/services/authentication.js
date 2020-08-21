import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.APP_API_BASE_URL}/authentication`,
  withCredentials: true
});

export const signUp = body =>
  api.post('/sign-up', body).then(response => response.data);

export const signIn = body =>
  api.post('/sign-in', body).then(response => response.data);

export const signOut = () =>
  api.post('/sign-out').then(response => response.data);

export const loadProfile = () =>
  api.get('/profile').then(response => response.data);
