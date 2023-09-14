const express = require('express');
const {
  getFeed,
  searchFeed,
  sortFeed,
  requestListing,
  getFeedListing,
} = require('../controllers/feedController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getFeed);
router.route('/search').get(searchFeed);
router.route('/sort').get(sortFeed);
router.route('/:id').put(protect, requestListing).get(getFeedListing);

module.exports = router;
