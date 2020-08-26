'use strict';

const express = require('express');
const User = require('../models/user');

const routeAuthenticationGuard = require('../middleware/route-guard');

const fileUploader = require('../cloudinary-config');

const profileRouter = new express.Router();

profileRouter.get('/:id', fileUploader.single('avatar'), async (req, res, next) => {
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

profileRouter.patch('/:id', async (req, res, next) => {
  const { name, username, password, gender, birthday, privateAddress, email, avatar } = req.body;

  const id = req.params.id;
  try {
    const user = await User.findOneAndUpdate(
      { _id: id, creator: req.user._id },
      {
        user: req.user._id,
        name,
        username,
        password,
        gender,
        birthday,
        privateAddress,
        email,
        avatar
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

//ostRouter.patch('/:id', routeAuthenticationGuard, (request, response, next) => {
//const id = request.params.id;

//Post.findOneAndUpdate(
//  { _id: id, creator: request.user._id },
//  { content: request.body.content },
//  { new: true }
//)
//  .then(post => {
//     response.json({ post });
//   })
//   .catch(error => {
//     next(error);
//   });
//);

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
