const express = require('express');
const {
  getFeed,
  requestListing,
  getFeedListing,
} = require('../controllers/feedController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getFeed);
router.route('/:id').put(protect, requestListing).get(getFeedListing);

module.exports = router;
