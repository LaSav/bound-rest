const asyncHandler = require('express-async-handler');

const Listing = require('../models/listingModel');
const User = require('../models/userModel');

//@desc Show Requests
//@route GET /api/listings/:id
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

  // Move matched id from body into Listing Document field 'matches'
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

module.exports = { showRequests, matchRequests };
