import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  withCredentials: true
});

// POST - '/recommendation' - Handle recommendation creation form submission. Send the created recommendation in JSON response.
// PATCH - '/recommendation' - Handle recommendation edit form submission. Send the created recommendation in JSON response.
// DELETE - '/recommendation' - Handle recommendation delete form submission. Send the created recommendation in JSON response.
