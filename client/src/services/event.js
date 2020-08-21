import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  withCredentials: true
});

// GET - '/event/:id' - Find event and send it as JSON to the client.
// PATCH - '/event/:id' - Handle form submission to edit event.
// DELETE - '/event/:id' - Handle form submission to delete event.
