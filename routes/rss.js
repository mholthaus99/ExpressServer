const express = require('express');
const router = express.Router();

const FEED_URL = 'https://rss.app/feeds/v1.1/p2jj50OvS5b0FmsC.json';

router.get('/', async (req, res) => {
  try {
    const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
    const response = await fetch(FEED_URL);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const feedJson = await response.json();
    if (!feedJson.items || !Array.isArray(feedJson.items)) {
      return res.status(500).json({ error: 'Invalid feed format: no items array' });
    }

    const titles = feedJson.items.map(item => item.title);
    res.json(titles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch or parse feed', details: err.message });
  }
});

module.exports = router;
