import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}/authentication`,
  withCredentials: true
});

export const signUp = body =>
  api.post('/sign-up', body).then(response => response.data);

// export const signUp = body => {
//   const formBody = new window.FormData();
//   formBody.append('content', body.content);
//   formBody.append('photo', body.photo);
//   // for (let property in body) formBody.append(property, body[property]);
//   api.post('/post', formBody).then(response => response.data);
// };

export const signIn = body =>
  api.post('/sign-in', body).then(response => response.data);

export const signOut = () =>
  api.post('/sign-out').then(response => response.data);

export const loadMe = () => api.get('/me').then(response => response.data);

export const confirmEmail = token =>
  api.get(`/confirmation/${token}`).then(response => response.data);
