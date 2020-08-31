'use strict';

const User = require('../models/user');

const deserializeUser = async (request, response, next) => {
  // Make the user object available to any route handler or middleware
  // after this
  const id = request.session.userId;
  console.log('req session userId: ', id);

  try {
    const user = await User.findById(id).select(
      '_id name email username avatar'
    );
    console.log('user: ', user);
    request.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deserializeUser;
