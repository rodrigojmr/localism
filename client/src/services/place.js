import axios from 'axios';
import jsonToFormData from './parseFormData';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

// METHOD ENDPOINT/ACTION DESCRIPTION

// GET - '/place/:id' - Find place and send it as JSON to the client.
// PATCH - '/place/:id' - Handle form submission to edit place.

// DELETE - '/place/:id' - Handle form submission to delete event.

export const loadAllPlaces = () =>
  api.get('/place/all').then(response => response.data);

export const nearbyPlaces = async boundaries => {
  const { neLat, neLng, swLat, swLng } = boundaries;
  try {
    const response = await api.get(`/place/nearby`, {
      params: { neLat, neLng, swLat, swLng }
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const createPlace = async body => {
  const formData = jsonToFormData(body);
  try {
    const response = await api.post('/place', formData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loadPlace = id =>
  api.get(`/place/${id}`).then(response => response.data);

export const deletePlace = id =>
  api.delete(`/place/${id}`).then(response => response.data);

export const editPlace = (id, body) =>
  api.patch(`/place/${id}`, body).then(response => response.data);
