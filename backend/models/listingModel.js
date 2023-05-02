const mongoose = require('mongoose');

const listingSchema = mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, 'Please add a text value'],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Listing', listingSchema);
