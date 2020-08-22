import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}`,
  withCredentials: true
});

// GET - '/feed' - List all posts, sort by date and send them as JSON to the client.
// GET - '/feed/updates' - List all updates, sort by date and send them as JSON to the client.
// GET - '/feed/promos' - List all promos, sort by date (?) and send them as JSON to the client.
// GET - '/feed/recommendations' - List all recommendations, sort by upvotes within a certain date and send them as JSON to the client.
