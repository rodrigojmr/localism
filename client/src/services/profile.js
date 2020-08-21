import axios from 'axios';

const api = axios.create({
  baseURL: `${process.env.API_BASE_URL}`,
  withCredentials: true
});

// Route handlers regarding places
// GET - '/' - List nearby places & Recent Updates and send them as JSON to the client.
// GET - '/profile/:id' - Find user and send as JSON to the client.
// PATCH - '/profile/:id' - Handle form submission to edit user.
// DELETE - '/profile/:id' - Handle form submission to delete user. Redirect to homepage.

// Route handlers regarding authentication
// POST - '/authentication/sign-up' - Handle sign up form submission.
// POST - '/authentication/sign-in' - Handle sign in form submission.
// POST - '/authentication/sign-out' - Handle sign out form submission.
// GET - '/authentication/me' - Load an the authenticated user
