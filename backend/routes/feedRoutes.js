const express = require('express');
const { getFeed, requestListing } = require('../controllers/feedController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getFeed);
router.route('/:id').put(requestListing);

module.exports = router;
