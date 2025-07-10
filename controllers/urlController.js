const Url = require('../models/Url');
const { nanoid } = require('nanoid');
const validUrl = require('validator');
const asyncHandler = require('express-async-handler');

const baseUrl = process.env.BASE_URL || 'http://localhost:5000';


const isValidUrl = (url) => validUrl.isURL(url, { require_protocol: true });


exports.shortenUrl = asyncHandler(async (req, res) => {
  const { url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: 'Invalid URL format. Please include http:// or https://' });
  }

  
  const shortCode = nanoid(6);

  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + 7);

 
  await Url.create({
    originalUrl: url,
    shortCode,
    expiryDate,
  });

  res.status(201).json({ shortUrl: `${baseUrl}/${shortCode}` });
});


exports.redirectToOriginalUrl = asyncHandler(async (req, res) => {
  const { code } = req.params;

  const record = await Url.findOne({ shortCode: code });

  if (!record) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  if (record.expiryDate && record.expiryDate < new Date()) {
    return res.status(410).json({ error: 'URL expired' });
  }

  
  record.clicks++;
  await record.save();

  res.redirect(record.originalUrl);
});


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
