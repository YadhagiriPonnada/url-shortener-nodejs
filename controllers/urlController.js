const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const validUrl = require('validator');
const asyncHandler = require('express-async-handler');

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

// Utility function for URL validation (can be moved to utils/validateUrl.js)
const isValidUrl = (url) => validUrl.isURL(url, { require_protocol: true });

// POST /shorten - Create short URL
exports.shortenUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format. Please include http:// or https://' });
  }

  // Generate unique short code
  const shortCode = nanoid(6);

  // Expiry: 7 days from now
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

  // Save to DB
  await Url.create({
    originalUrl: url,
    shortCode,
    expiryDate,
  });

  res.status(201).json({ shortUrl: `${baseUrl}/${shortCode}` });
});

// GET /:code - Redirect to original URL
exports.redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const record = await Url.findOne({ shortCode: code });

  if (!record) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  if (record.expiryDate && record.expiryDate < new Date()) {
    return res.status(410).json({ error: 'URL expired' });
  }

  // Increment clicks count
  record.clicks++;
  await record.save();

  res.redirect(record.originalUrl);
});

// GET /stats/:code - Get URL stats
exports.getStats = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const record = await Url.findOne({ shortCode: code });

  if (!record) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.json({
    originalUrl: record.originalUrl,
    shortCode: record.shortCode,
    createdAt: record.createdAt,
    expiryDate: record.expiryDate,
    clicks: record.clicks,
  });
});
