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
// @access Private
const requestListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);
  const user = await User.findById(req.user.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  if (!user) {
    res.status(400);
    throw new Error('Not authenticated user');
  }

  // const requestedListing = await Listing.findByIdAndUpdate(
  //   req.params.id,
  //   { $addToSet: { requests: user._id } },
  //   { new: true }
  // )
  //   .populate({
  //     path: 'requests',
  //     select: 'name',
  //   })
  //   .exec();

  // const requestedListing = await Listing.findByIdAndUpdate(
  //   req.params.id,
  //   { $addToSet: { requests: user._id } },
  //   { new: true }
  // );

  // Check if the user ID is already in the requests array
  const isRequested = listing.requests.some(
    (request) => request.toString() === user._id.toString()
  );

  if (isRequested) {
    res.status(400);
    throw new Error('Listing already requested by this user');
  }

  // Check if User is Creator of Listing.
  if (user._id.toString() === listing.user.toString()) {
    res.status(400);
    throw new Error('User is creator of Listing');
  }

  listing.requests.push(user._id);

  await listing.save();

  res.json(user._id);
});

// @desc Geet a single listing
// @route Get /api/feed/:id
// @access Public
const getFeedListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  res.status(200).json(listing);
});

module.exports = { getFeed, requestListing, getFeedListing };
