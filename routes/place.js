const express = require('express');
const Place = require('../models/place');
const Support = require('../models/support');

const routeAuthenticationGuard = require('../middleware/route-guard');

const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

const placeRouter = new express.Router();

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2
});
const upload = multer({ storage });

placeRouter.get('/nearby', (req, res, next) => {
  console.log(req.query);

  const { neLat, neLng, swLat, swLng } = req.query;

  Place.find({})
    .where('location.coordinates.0')
    .lt(neLat)
    .gte(swLat)
    .where('location.coordinates.1')
    .gte(swLng)
    .lt(neLng)

    // .populate('creator')
    // .sort({ creationDate: -1 })
    .then(places => {
      console.log('places: ', places);
      res.json({ places });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.get('/:id', async (req, res, next) => {
  const id = req.params.id;

  try {
    const place = await Place.findById(id)
      .populate('owner supports')
      .populate({
        path: 'supports',
        populate: {
          path: 'author',
          model: 'User'
        }
      });
    if (place) {
      res.json({ place });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

placeRouter.post('/', (req, res, next) => {
  const {
    name,
    place_id,
    category,
    openDate,
    formatted_address,
    address_components,
    weekDayFrom,
    weekDayTo,
    openTime,
    closeTime,
    phoneNumber,
    email,
    lat,
    lng
  } = req.body;

  Place.create({
    owner: req.user._id,
    name,
    category,
    openDate,
    schedule: {
      from: weekDayFrom,
      to: weekDayTo,
      time: {
        openTime,
        closeTime
      }
    },
    contacts: {
      phoneNumber,
      email
    },
    formatted_address,
    address_components,
    place_id,
    location: {
      coordinates: [lat, lng]
    }
  })
    .then(place => {
      res.json({ place });
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.delete('/:id', routeAuthenticationGuard, async (req, res, next) => {
  const id = req.params.id;

  Place.findOneAndDelete({ _id: id, creator: req.user._id })
    .then(() => {
      res.json({});
    })
    .catch(error => {
      next(error);
    });
});

placeRouter.patch('/:id', routeAuthenticationGuard, (req, res, next) => {
  const {
    name,
    category,
    openDate,
    address,
    areaName,
    weekDayFrom,
    weekDayTo,
    openTime,
    closeTime,
    phoneNumber,
    email,
    latitude,
    longitude
  } = req.body;

  const id = req.params.id;

  Place.findOneAndUpdate(
    { _id: id, creator: req.user._id },
    {
      owner: req.user._id,
      name,
      category,
      openDate,
      schedule: {
        from: weekDayFrom,
        to: weekDayTo,
        time: {
          openTime,
          closeTime
        }
      },
      contacts: {
        phoneNumber,
        email
      },
      address,
      areaName,
      location: {
        coordinates: [latitude, longitude]
      }
    },
    { new: true }
  )
    .then(post => {
      res.json({ post });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = placeRouter;
