const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Static URL for the JSON feed
const FEED_URL = 'https://rss.app/feeds/v1.1/p2jj50OvS5b0FmsC.json';

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// RSS route that returns array of titles from the fixed feed URL
app.get('/rss', async (req, res) => {
  try {
    // Dynamic import of node-fetch
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
