'use strict';

const { join } = require('path');
const express = require('express');
const cors = require('cors');
const serveFavicon = require('serve-favicon');
const connectMongo = require('connect-mongo');
const expressSession = require('express-session');
const logger = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index');
const placeRouter = require('./routes/place');
const supportRouter = require('./routes/support');
const profileRouter = require('./routes/profile');
const authenticationRouter = require('./routes/authentication');

const deserializeUser = require('./middleware/deserializeUser.js');

const mongoStore = connectMongo(expressSession);

const app = express();

app.set('trust proxy', 1);

app.use(serveFavicon(join(__dirname, 'public/images', 'favicon.ico')));

app.use(logger('dev'));
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:3000']
  })
);

app.use(bodyParser.json());
app.use(
  expressSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 15,
      sameSite: 'lax',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production'
    },
    store: new mongoStore({
      mongooseConnection: mongoose.connection,
      ttl: 60 * 60 * 24
    })
  })
);
app.use(deserializeUser);

app.use('/', indexRouter);
app.use('/place', placeRouter);
app.use('/support', supportRouter);
app.use('/profile', profileRouter);
app.use('/authentication', authenticationRouter);

// Catch missing routes and forward to error handler
app.use((req, res, next) => {
  res.status(404);
  const error = new Error('Page not found.');
  next(error);
});

// Catch all error handler
app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500);
  res.json({ type: 'error', error: { message: error.message } });
});

module.exports = app;
