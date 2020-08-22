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
    schedule: {
      from: {
        type: String
      },
      to: {
        type: String
      },
      time: {
        openTime: {
          type: Date
        },
        closeTime: {
          type: Date
        }
      }
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    contacts: {
      phoneNumber: {
        type: String
      },
      email: {
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
      // required: true
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
