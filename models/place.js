const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
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
      ref: 'User',
      required: true
    },
    contacts: {
      phoneNumber: {
        type: String
      },
      email: {
        type: String
      },
      website: {
        type: String
      },
      instagram: {
        type: String
      }
    },
    formatted_address: {
      type: String,
      required: true,
      unique: true
    },
    address_components: {
      type: Array,
      required: true
    },
    place_id: {
      type: String,
      required: true,
      unique: true
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
    about: {
      type: String
    },
    description: {
      type: String
    },
    supports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Support'
      }
    ],
    images: [
      {
        type: String
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
