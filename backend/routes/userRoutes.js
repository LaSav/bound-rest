const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send({ message: 'Users Route' });
});

module.exports = router;
