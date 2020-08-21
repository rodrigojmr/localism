const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String
    },
    openDate: {
      type: Date
    },
    schedule: [
      {
        weekday: {
          type: String
        },
        time: {
          opening: {
            type: Date
          },
          closing: {
            type: Date
          }
        }
      }
    ],
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    contacts: {
      phoneNumber: {
        type: String
      }
    },
    address: {
      type: String,
      required: true
    },
    areaName: {
      type: String,
      required: true
    },
    location: {
      coordinates: [
        {
          type: Number,
          min: -180,
          max: 180
        }
      ],
      type: {
        type: String,
        default: 'Point'
      }
    },
    suggestions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Suggestion'
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'editDate'
    }
  }
);

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;
