const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const marked = require('marked');

router.get('/', (req, res) => {
  const markdownPath = path.join(__dirname, '..', 'markdown', 'resume.md');

  fs.readFile(markdownPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error loading resume.');
    }

    const htmlContent = marked.parse(data);

    res.render('layout', {
      title: 'About',
      body: 'about',
      htmlContent: htmlContent, // pass converted HTML to the template
      extraStyles: ['/css/markdown-style-resume.css'] // optional, used only by this page
    });
  });
});

module.exports = router;
