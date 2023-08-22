const express = require('express');
const {
  getListings,
  getListing,
  createListing,
  updateListing,
  deleteListing,
  showRequests,
  matchRequests,
  getRequested,
  getMatched,
} = require('../controllers/listingController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getListings).post(protect, createListing);

router.route('/requested').get(protect, getRequested);
router.route('/matched').get(protect, getMatched);

router
  .route('/:id')
  .get(protect, getListing)
  .put(protect, updateListing)
  .delete(protect, deleteListing);

router
  .route('/requests/:id')
  .get(protect, showRequests)
  .put(protect, matchRequests);

module.exports = router;
