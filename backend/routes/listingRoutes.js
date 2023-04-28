const express = require('express');
const {
  getListings,
  createListing,
  updateListing,
  deleteListing,
} = require('../controllers/listingController');

const router = express.Router();

router.get('/', getListings);

router.post('/', createListing);

router.put('/:id', updateListing);

router.delete('/:id', deleteListing);

module.exports = router;
