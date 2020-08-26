'use strict';

const express = require('express');
const User = require('../models/user');

const routeAuthenticationGuard = require('../middleware/route-guard');

const fileUploader = require('../cloudinary-config');

const profileRouter = new express.Router();

profileRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id)
      .select('username name avatar info locality supports')
      .populate('supports')
      .populate({
        path: 'supports',
        populate: {
          path: 'place',
          model: 'Place',
          select: {
            _id: 1,
            name: 1,
            category: 1,
            address_components: 1,
            images: 1
          }
        }
      });
    if (user) {
      res.json({ user });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

profileRouter.patch('/:id', fileUploader.single('avatar'), async (req, res, next) => {
  const { name, username, password, gender, birthday, privateAddress, email } = req.body;
  const id = req.params.id;
  let url;
  if (req.file) {
    url = req.file.path;
  }

  const locality = privateAddress.find(
    component =>
      component.types.includes('locality') ||
      component.types.includes('administrative_area_level_1')
  ).short_name;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      {
        user: req.user._id,
        name,
        username,
        passwordHashAndSalt: password,
        gender,
        birthday,
        privateAddress,
        locality,
        email,
        avatar: url
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

profileRouter.delete('/:id', routeAuthenticationGuard, async (req, res, next) => {
  const id = req.params.id;

  User.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

module.exports = profileRouter;
