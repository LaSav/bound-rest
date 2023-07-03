const express = require('express');
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  showRequests,
  matchRequests,
  showRequested,
  showMatched,
} = require('../controllers/listingController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getListings).post(protect, createListing);

router
  .route('/:id')
  .get(protect, getListing)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

router
  .route('/requests/:id')
  .get(protect, showRequests)
  .put(protect, matchRequests);

router.route('/requested').get(protect, showRequested);
router.route('/matched').get(protect, showMatched);

module.exports = router;
