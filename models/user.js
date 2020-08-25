'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    unique: true,
    trim: true,
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 60,
    trim: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    trim: true
  },
  token: { type: String },
  active: {
    type: Boolean,
    default: false
  },
  passwordHashAndSalt: {
    type: String
  },
  avatar: {
    type: String
  },
  info: {
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    }
  },
  locality: {
    type: String
  },
  privateAddress: {
    long: {
      type: String
    },
    lat: {
      type: String
    }
  },
  owner: {
    type: Boolean
  },
  support: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Suggestion'
    }
  ],
  checkInHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
  activity: {
    type: Number
  }
});

module.exports = mongoose.model('User', schema);
