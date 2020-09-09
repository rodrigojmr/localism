'use strict';

const User = require('../models/user');

const deserializeUser = async (request, response, next) => {
  // Make the user object available to any route handler or middleware
  // after this
  const id = request.session.userId;

  try {
    const user = await User.findById(id).select(
      '_id name email username avatar'
    );
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deserializeUser;
