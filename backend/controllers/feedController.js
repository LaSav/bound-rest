const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');
const User = require('../models/userModel');

// I might need to remove matches and requests from this response
// @desc Get Feed
// @route GET /api/feed
// @access Public
const getFeed = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
  res.status(200).json(listings);
});

// Only authenticated users can send a request
// @desc Request a listing
// @route PUT /api/feed/:id
// @access Public
const requestListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  if (!user) {
    res.status(400);
    throw new Error('Not authenticated user');
  }

  const user = await User.findById(req.user.id);

  console.log(user._id);

  const requestedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { requests: user._id } },
    { new: true }
  )
    .populate({
      path: 'requests',
      select: 'name',
    })
    .exec();

  // const requestedListing = await Listing.findByIdAndUpdate(
  //   req.params.id,
  //   { $addToSet: { requests: user._id } },
  //   { new: true }
  // );

  // Check if the user ID is already in the requests array
  // const isRequested = listing.requests.some(
  //   (request) => request.toString() === user._id.toString()
  // );

  // if (isRequested) {
  //   res.status(400);
  //   throw new Error('Listing already requested by this user');
  // }

  // listing.requests.push(user._id);

  // const requestedListing = await listing.save();

  res.json(requestedListing);
});

module.exports = { getFeed, requestListing };
