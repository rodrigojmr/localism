import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  withCredentials: true
});

// METHOD ENDPOINT/ACTION DESCRIPTION

// GET - '/place/:id' - Find place and send it as JSON to the client.
// PATCH - '/place/:id' - Handle form submission to edit place.

// DELETE - '/place/:id' - Handle form submission to delete event.

export const listPlaces = () =>
  api.get('/post/list').then(response => response.data);

// export const createPost = body => api.post('/post', body).then(response => response.data);
export const createPlace = body => {
  return api.post('/place', body).then(response => response.data);
};

export const loadplace = id =>
  api.get(`/place/${id}`).then(response => response.data);

export const deleteplace = id =>
  api.delete(`/place/${id}`).then(response => response.data);

export const editplace = (id, body) =>
  api.patch(`/place/${id}`, body).then(response => response.data);
