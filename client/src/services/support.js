import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true,
  headers: {
    'content-type': 'application/json'
  }
});

export const listSupports = () =>
  api.get('/support').then(response => response.data);

export const createSupport = (id, body) =>
  api.post(`/support/${id}`, body).then(response => response.data);

export const loadSupport = id =>
  api.get(`/support/${id}`).then(response => response.data);

export const deleteSupport = id =>
  api.delete(`/support/${id}`).then(response => response.data);

export const editSupport = (id, body) =>
  api.patch(`/support/${id}`, body).then(response => response.data);
