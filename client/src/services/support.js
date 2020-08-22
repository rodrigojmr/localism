import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

export const listSupports = () =>
  api.get('/support/list').then(response => response.data);

export const createSupport = body => {
  const formBody = new window.FormData();
  formBody.append('support', body.support);
  formBody.append('content', body.content);
  return api.post('/support', formBody).then(response => response.data);
};

export const loadPost = id =>
  api.get(`/support/${id}`).then(response => response.data);

export const deletePost = id =>
  api.delete(`/support/${id}`).then(response => response.data);

export const editPost = (id, body) =>
  api.patch(`/support/${id}`, body).then(response => response.data);
