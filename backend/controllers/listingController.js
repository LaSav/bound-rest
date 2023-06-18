const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');
const User = require('../models/userModel');

//-------------- CRUD Functions for a User's Listing ------------//

// @desc Get Listings
// @route GET /api/listings
// @access Private
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ user: req.user.id });
  res.status(200).json(listings);
});

// @desc Create a Listing
// @route POST /api/listings
// @access Private
const createListing = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please Add Text Field');
  }

  const listing = await Listing.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(listing);
});

// @desc Update a Listing
// @route /api/listings/:id
// @access Private
const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matches the Listing user
  if (listing.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.status(200).json(updatedListing);
});

// @desc Delete a Listing
// @route /api/listings/:id
// @access Private
const deleteListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matched the Listing user
  if (listing.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await listing.deleteOne();

  res.status(200).json({ id: req.params.id });
});

//-------------------- Requests of a User's Listing Functions ------------ //

//@desc Show Your Listing Requests
//@route GET /api/listings/requests/:id
//@access Private
const showRequests = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matched the Listing user
  if (listing.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const listingRequests = await listing.requests;

  const requestedUsers = await Promise.all(
    listingRequests.map((listingRequest) => {
      return User.findById(listingRequest).select('-password');
    })
  );

  res.status(200).json(requestedUsers);
});

//@desc Match with Listing Requests
//@route PUT /api/listings/requests/:id
//@access Private
const matchRequests = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(400);
    throw new Error('Listing not found');
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error('User not found');
  }
  // Make sure the logged in user matched the Listing user
  if (listing.user.toString() !== user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  // Send matched id from body into Listing Document field 'matches'
  const updatedMatchedListing = await Listing.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { matches: req.body._id } },
    { new: true }
  )
    .populate({
      path: 'matches',
      select: 'name',
    })
    .exec();
  res.status(200).json(updatedMatchedListing);
});

//@desc Show Listings a User has Requested to
//@route GET /api/listings/requested
//@access Private
const showRequested = asyncHandler(async (req, res) => {
  // Get all Listings
  const listings = await Listing.find();
  // Get User Id
  const user = await User.findById(req.user.id);

  const requestedListings = [];

  for (i = 0; i < listings.length; i++) {
    if (
      listings[i].requests.some(
        (request) => request.toString() === user._id.toString()
      )
    ) {
      requestedListings.push(listings[i]);
    }
  }

  res.status(200).json(requestedListings);
});

//@desc Show Listings a User has Matched With
//@route GET /api/listings/matched
//@access Private
const showMatched = asyncHandler(async (req, res) => {
  // Get all Listings
  const listings = await Listing.find();
  // Get User Id
  const user = await User.findById(req.user.id);

  const matchedListings = [];

  for (i = 0; i < listings.length; i++) {
    if (
      listings[i].matches.some(
        (match) => match.toString() === user._id.toString()
      )
    ) {
      matchedListings.push(listings[i]);
    }
  }

  res.status(200).json(matchedListings);
});

//@desc Delete a Request from another User's Listing
//@route DELETE /api/listings...
//@access Private

module.exports = {
  getListings,
  createListing,
  updateListing,
  deleteListing,
  showRequests,
  matchRequests,
  showRequested,
  showMatched,
};
