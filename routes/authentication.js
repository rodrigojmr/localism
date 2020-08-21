'use strict';

const { Router } = require('express');

const bcrypt = require('bcrypt');
const User = require('./../models/user');

const authenticationRouter = new Router();

authenticationRouter.post('/sign-up', async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    if (password.length < 8) throw new Error('Password is too short.');
    const hashAndSalt = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHashAndSalt: hashAndSalt
    });
    req.session.userId = user._id;
    res.json({ user: { _id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-in', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('No user with that email.');

    const passwordHashAndSalt = user.passwordHashAndSalt;
    const comparison = await bcrypt.compare(password, passwordHashAndSalt);
    if (!comparison) throw new Error('Password did not match.');

    req.session.userId = user._id;
    res.json({ user: { name: user.name, email: user.email } });
  } catch (error) {
    next(error);
  }
});

authenticationRouter.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

authenticationRouter.get('/me', (request, response) => {
  const user = request.user;
  response.json({ user });
});

module.exports = authenticationRouter;
