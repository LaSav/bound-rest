const asyncHandler = require('express-async-handler');
const Listing = require('../models/listingModel');

// @desc Get Listings
// @route GET /api/listings
// @access Private
const getListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find();
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

  await listing.deleteOne();

  res.status(200).json({ id: req.params.id });
});
module.exports = {
  getListings,
  createListing,
  updateListing,
  deleteListing,
};
