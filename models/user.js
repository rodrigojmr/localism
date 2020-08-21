'use strict';

const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    minlength: 3,
    maxlength: 30,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
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
  Locality: {
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
  checkInHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Place'
    }
  ],
  owner: {
    type: Boolean
  },
  suggestions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Suggestion'
    }
  ],
  activity: {
    type: Number
  }
});

module.exports = mongoose.model('User', schema);
