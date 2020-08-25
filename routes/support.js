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

supportRouter.post('/', (request, response, next) => {
  //const { creator, place, content } = request.body;
  //console.log('req.body: ', request.body);

  Support.create({
    creator: request.user._id,
    place: request.place._id,
    content: request.body.content
  })
    .then(support => {
      response.json({ support });
    })
    .catch(error => {
      next(error);
    });
});

supportRouter.delete(
  '/:id',
  routeAuthenticationGuard,
  async (request, response, next) => {
    const id = request.params.id;

    Support.findOneAndDelete({ _id: id, creator: request.user._id })
      .then(() => {
        response.json({});
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
