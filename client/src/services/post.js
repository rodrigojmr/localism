import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  withCredentials: true
});

// METHOD ENDPOINT/ACTION DESCRIPTION

// Route handlers regarding posts
// GET - '/' - List nearby places & Recent Updates and send them as JSON to the client.
// GET - '/profile/:id' - Find user and send as JSON to the client.
// PATCH - '/profile/:id' - Handle form submission to edit user.
// DELETE - '/profile/:id' - Handle form submission to delete user. Redirect to homepage.

// GET - '/feed' - List all posts, sort by date and send them as JSON to the client.
// GET - '/feed/updates' - List all updates, sort by date and send them as JSON to the client.
// GET - '/feed/promos' - List all promos, sort by date (?) and send them as JSON to the client.
// GET - '/feed/recommendations' - List all recommendations, sort by upvotes within a certain date and send them as JSON to the client.

// GET - '/place/:id' - Find place and send it as JSON to the client.
// GET - '/event/:id' - Find event and send it as JSON to the client.
// PATCH - '/place/:id' - Handle form submission to edit place.
// PATCH - '/place/:id' - Handle form submission to edit place.
// DELETE - '/event/:id' - Handle form submission to delete event.
// DELETE - '/event/:id' - Handle form submission to delete event.

// POST - '/recommendation' - Handle recommendation creation form submission. Send the created recommendation in JSON response.
// PATCH - '/recommendation' - Handle recommendation edit form submission. Send the created recommendation in JSON response.
// DELETE - '/recommendation' - Handle recommendation delete form submission. Send the created recommendation in JSON response.

// Route handlers regarding authentication
// POST - '/authentication/sign-up' - Handle sign up form submission.
// POST - '/authentication/sign-in' - Handle sign in form submission.
// POST - '/authentication/sign-out' - Handle sign out form submission.
// GET - '/authentication/me' - Load an the authenticated user
