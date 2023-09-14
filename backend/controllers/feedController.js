const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');
const User = require('../models/userModel');

// @desc Get Feed
// @route GET /api/feed
// @access Public
const getFeed = asyncHandler(async (req, res) => {
  const page = req.query.page || 1;
  const pageSize = 10;

  const skip = (page - 1) * pageSize;

  // if (!requiredSkill && !searchText) {
  const listings = await Listing.find().skip(skip).limit(pageSize);
  res.status(200).json(listings);
  // }

  // if (requiredSkill) {
  // let listings = [];
  // for (skill of requiredSkills) {
  //   const skillListings = await Listing.find({ requiredSkill: skill });
  //   listings = listings.concat(skillListings);
  // }
  //   const listings = await Listing.find({ requiredSkill: requiredSkill });

  //   res.status(200).json(listings).skip(skip).limit(perPage);
  // }

  // if (searchText) {
  //   const listings = await Listing.find({
  //     text: { $regex: searchText, $options: 'i' },
  //   });
  //   res.json(listings).skip(skip).limit(perPage);
  // }
});

// @desc Search Feed
// @route GET /api/feed/search
// @access public
const searchFeed = asyncHandler(async (req, res) => {
  const { query } = req.query;
  const page = req.query.page || 1;
  const pageSize = 10;

  const skip = (page - 1) * pageSize;

  const listings = await Listing.find({
    text: { $regex: query, $options: 'i' },
  });
  res.json(listings).skip(skip).limit(pageSize);
});

// @desc Sort Feed
// @route GET /api/feed/sort
// @access public
const sortFeed = asyncHandler(async (req, res) => {
  const { requiredSkill } = req.query;
  const page = req.query.page || 1;
  const pageSize = 10;

  const skip = (page - 1) * pageSize;

  const listings = await Listing.find({ requiredSkill: requiredSkill });

  res.status(200).json(listings).skip(skip).limit(pageSize);
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

  res.status(200).json(user._id);
});

// @desc Geet a single listing
// @route Get /api/feed/:id
// @access Public
const getFeedListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  res.status(200).json(listing);
});

module.exports = {
  getFeed,
  searchFeed,
  sortFeed,
  requestListing,
  getFeedListing,
};
