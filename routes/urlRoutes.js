const express = require('express');
const router = express.Router();

const {
  shortenUrl,
  redirectToOriginalUrl,
  getStats
} = require('../controllers/urlController');


router.post('/shorten', shortenUrl);


router.get('/stats/:code', getStats);


router.get('/:code', redirectToOriginalUrl);

module.exports = router;
