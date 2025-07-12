const express = require('express');
const router = express.Router();

const projects = [
  {
    slug: 'server',
    title: 'Custom Server Rack',
    description: 'A compact 3D-printed home server rack.',
    image: '/images/server-preview.jpg'
  },
  {
    slug: 'lcd',
    title: 'ESP8266 LCD Info Screen',
    description: 'Displays RSS feeds, timers, and messages on an LCD.',
    image: '/images/lcd-preview.jpg'
  }
];

router.get('/', (req, res) => {
  res.render('layout', {
    title: 'Projects',
    body: 'project_list',
    projects
  });
});

// Helper to inject partial view into layout
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

function renderPartial(viewName, data) {
  const filePath = path.join(__dirname, '..', 'views', `${viewName}.ejs`);
  const template = fs.readFileSync(filePath, 'utf-8');
  return ejs.render(template, data);
}

router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, '..', 'markdown', 'projects', `${slug}.md`);


  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('Project not found');

    const marked = require('marked');
    const htmlContent = marked.parse(data);

    res.render('project', {
      title: projects.find(p => p.slug === slug)?.title || 'Project',
      body: htmlContent
    });
  });
});


module.exports = router;


