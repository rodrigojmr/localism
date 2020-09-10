'use strict';

const User = require('../models/user');

const deserializeUser = async (req, res, next) => {
  // Make the user object available to any route handler or middleware
  // after this
  const id = req.session.userId;
  console.log('req.session: ', req.session);
  console.log('deserialize req session userId:', req.session.userId);

  try {
    const user = await User.findById(id).select(
      '_id name email username avatar'
    );
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = deserializeUser;
