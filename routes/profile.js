'use strict';

const express = require('express');
const User = require('../models/user');

const routeAuthenticationGuard = require('../middleware/route-guard');

const fileUploader = require('../cloudinary-config');

const profileRouter = new express.Router();

profileRouter.get('/', async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id)
      .populate('supports')
      .populate({
        path: 'supports',
        populate: {
          path: 'place',
          model: 'Place',
          select: { _id: 1, name: 1, category: 1, address_components: 1, images: 1 }
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

// placeRouter.delete('/:id', routeAuthenticationGuard, async (req, res, next) => {
//   const id = req.params.id;

//   Place.findOneAndDelete({ _id: id, creator: req.user._id })
//     .then(() => {
//       res.json({});
//     })
//     .catch(error => {
//       next(error);
//     });
// });

// placeRouter.patch('/:id', (req, res, next) => {
//   const {
//     name,
//     category,
//     openDate,
//     address,
//     areaName,
//     weekDayFrom,
//     weekDayTo,
//     openTime,
//     closeTime,
//     phoneNumber,
//     email,
//     latitude,
//     longitude
//   } = req.body;

//   const id = req.params.id;

//   Place.findOneAndUpdate(
//     { _id: id, creator: req.user._id },
//     {
//       owner: req.user._id,
//       name,
//       category,
//       openDate,
//       schedule: {
//         from: weekDayFrom,
//         to: weekDayTo,
//         time: {
//           openTime,
//           closeTime
//         }
//       },
//       contacts: {
//         phoneNumber,
//         email
//       },
//       address,
//       areaName,
//       location: {
//         coordinates: [latitude, longitude]
//       }
//     },
//     { new: true }
//   )
//     .then(post => {
//       res.json({ post });
//     })
//     .catch(error => {
//       next(error);
//     });
// });

module.exports = profileRouter;
