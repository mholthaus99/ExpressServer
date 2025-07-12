const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

const router = express.Router();

router.get('/:name', (req, res) => {
  const filePath = path.join(__dirname, '..', 'markdown', req.params.name + '.md');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Markdown file not found');
    }

    const htmlContent = marked.parse(data);

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>${req.params.name}</title>
        <link rel="stylesheet" href="/css/style.css">
        <link rel="stylesheet" href="/css/theme.css">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body class="body-styles">
        <header class="header-styles">
          <div class="header-container">
            <h1 class="site-title">Max Holthaus</h1>
            <nav class="nav-styles">
              <a href="https://maxholthaus.com" class="nav-link">Home</a>
              <a href="https://maxholthaus.com/docs/projects" class="nav-link">Projects</a>
              <a href="https://maxholthaus.com/docs/resume" class="nav-link">About</a>
            </nav>
          </div>
        </header>
        <main class="docs-body">
          ${htmlContent}
        </main>
      </body>
      </html>
    `);
  });
});

module.exports = router;
