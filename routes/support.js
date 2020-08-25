const express = require('express');
const Support = require('./../models/support');

const routeAuthenticationGuard = require('./../middleware/route-guard');

const supportRouter = new express.Router();

supportRouter.get('/', (request, response, next) => {
  Support.find()
    .populate('creator')
    .sort({ creationDate: -1 })
    .then(supports => {
      response.json({ supports });
    })
    .catch(error => {
      next(error);
    });
});

supportRouter.get('/:id', async (request, response, next) => {
  const id = request.params.id;
  try {
    const support = await Support.findById(id).populate('creator');
    if (support) {
      response.json({ support });
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
});

supportRouter.post('/:id', (req, res, next) => {
  const placeId = req.params.id;
  const { content } = req.body;

  Support.create({
    creator: req.user._id,
    place: placeId,
    content
  })
    .then(support => {
      res.json({ support });
    })
    .catch(error => {
      next(error);
    });
});

supportRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (req, res, next) => {
    const id = req.params.id;

    Support.findOneAndDelete({ _id: id, creator: req.user._id })
      .then(() => {
        res.json({});
      })
      .catch(error => {
        next(error);
      });
  }
);

supportRouter.patch(
  '/:id',
  routeAuthenticationGuard,
  (request, response, next) => {
    const id = request.params.id;

    Support.findOneAndUpdate(
      { _id: id, creator: request.user._id },
      { content: request.body.content },
      { new: true }
    )
      .then(post => {
        response.json({ post });
      })
      .catch(error => {
        next(error);
      });
  }
);

module.exports = supportRouter;
