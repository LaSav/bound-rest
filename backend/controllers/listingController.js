// @desc Get Listings
// @route GET /api/listings
// @access Private
const getListings = (req, res) => {
  res.status(200).json({ message: 'Get Listings' });
};
// @desc Create a Listing
// @route POST /api/listings
// @access Private
const createListing = (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error('Please Add Text Field');
  }
  console.log(req.body);
  res.status(200).json({ message: 'Create Listing' });
};
// @desc Update a Listing
// @route /api/listings/:id
// @access Private
const updateListing = (req, res) => {
  res.status(200).json({ message: `Update Listing ${req.params.id}` });
};
// @desc Delete a Listing
// @route /api/listings/:id
// @access Private
const deleteListing = (req, res) => {
  res.status(200).json({ message: `Delete Listing ${req.params.id}` });
};
module.exports = {
  getListings,
  createListing,
  updateListing,
  deleteListing,
};
