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
      }
    },
    formatted_address: {
      type: String,
      required: true
    },
    address_components: {
      type: Array,
      required: true
    },
    place_id: {
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
    supports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Support'
      }
    ],
    bonus: {
      type: String,
      enum: ['discount', 'offer', 'promo']
    },
    highlights: {
      type: String
    }
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
