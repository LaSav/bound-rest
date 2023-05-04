const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');

const getFeed = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  res.status(200).json(listings);
});

const requestListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }
  res.status(200).json(listing);
});

module.exports = { getFeed, requestListing };
