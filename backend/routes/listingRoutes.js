const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Get Listings' });
});

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Create Listing' });
});

router.put('/:id', (req, res) => {
  res.status(200).json({ message: `Update Listing ${req.params.id}` });
});

router.delete('/:id', (req, res) => {
  res.status(200).json({ message: `Delete Listing ${req.params.id}` });
});

module.exports = router;
