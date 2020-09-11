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
    type: String,
    default: '/images/default-avatar.png'
  },
  info: {
    age: {
      type: Number
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other']
    },
    about: {
      type: String,
      maxlength: 140
    }
  },
  locality: {
    type: String
  },
  privateAddress: {
    type: Array
  },
  owner: {
    type: Boolean,
    default: false
  },
  supports: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Support'
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
