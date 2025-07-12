const express = require('express');
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const ejs = require('ejs');

const router = express.Router();
const markdownDir = path.join(__dirname, '..', 'markdown');

// Helper to render partial views
function renderPartial(viewName, data) {
  const filePath = path.join(__dirname, '..', 'views', `${viewName}.ejs`);
  const template = fs.readFileSync(filePath, 'utf-8');
  return ejs.render(template, data);
}

router.get('/:name', (req, res) => {
  const name = req.params.name;
  const filePath = path.join(markdownDir, name + '.md');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(404).send('Markdown file not found');
    }

    const htmlContent = marked.parse(data);

    res.render('project', {
      title: name.charAt(0).toUpperCase() + name.slice(1),
      body: htmlContent
    });
  });
});

module.exports = router;
