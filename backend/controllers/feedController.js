const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');
const User = require('../models/userModel');

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

  const user = await User.findById(req.user.id);

  console.log(user._id);

  const requestedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    {
      requests: user._id,
    },
    { new: true }
  );

  res.json(requestedListing);
});

module.exports = { getFeed, requestListing };
