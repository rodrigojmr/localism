const mongoose = require('mongoose');

const supportSchema = new mongoose.Schema(
  {
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    place: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Place'
    },
    content: {
      type: String,
      maxlength: 280
    }
  },
  {
    timestamps: {
      createdAt: 'creationDate',
      updatedAt: 'editDate'
    }
  }
);

const Support = mongoose.model('Support', supportSchema);

module.exports = Support;
