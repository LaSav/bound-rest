const express = require('express');
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
  showRequests,
} = require('../controllers/listingController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getListings).post(protect, createListing);

router
  .route('/:id')
  .put(protect, updateListing)
  .delete(protect, deleteListing)
  .get(protect, showRequests);

module.exports = router;
