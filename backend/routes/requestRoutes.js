const express = require('express');
const {
  showRequests,
  matchRequests,
} = require('../controllers/requestController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/:id').put(protect, matchRequests).get(protect, showRequests);

module.exports = router;
