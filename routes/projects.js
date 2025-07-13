const express = require('express');
const router = express.Router();

const projects = [
  {
    slug: 'server',
    title: 'Custom Server Rack',
    description: 'A compact 3D-printed home server rack.',
    image: '/images/server_render.jpg'
  },
  {
    slug: 'lcd',
    title: 'ESP8266 LCD Info Screen',
    description: 'Displays RSS feeds, timers, and messages on an LCD.',
    image: '/images/lcd_render.jpg'
  },
  {slug: 'servo',
    title: 'Servo Control Switch w/ HA connection',
    description: 'A smart servo control switch with Home Assistant integration.',
    image: '/images/servoswitch_render.jpg'
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

router.get('/:slug', (req, res) => {
  const slug = req.params.slug;
  const filePath = path.join(__dirname, '..', 'markdown', 'projects', `${slug}.md`);

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) return res.status(404).send('Project not found');

    const marked = require('marked');
    const htmlContent = marked.parse(data);

    res.render('layout', {
      title: projects.find(p => p.slug === slug)?.title || 'Project',
      body: 'project',            // This is the name of the view inside /views
      htmlContent: htmlContent,                        // Passed into the included partial
      extraStyles: ['/css/markdown-style.css']
    });
  })
});

module.exports = router;


