const express = require('express');
const {
  getFeed,
  requestListing,
  getFeedListing,
} = require('../controllers/feedController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getFeed);
router.route('/:id').get(getFeedListing).put(protect, requestListing);

module.exports = router;
