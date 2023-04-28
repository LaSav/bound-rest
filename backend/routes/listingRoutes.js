const express = require('express');
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');

const router = express.Router();

router.route('/').get(getListings).post(createListing);

router.route('/:id').put(updateListing).delete(deleteListing);

module.exports = router;
