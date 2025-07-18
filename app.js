const express = require('express');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const app = express();
const PORT = 3000;

// Set view engine and views directory for EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

//mount routes
app.use('/', require('./routes/home'));
app.use('/about', require('./routes/about'));      // ✅ About route
app.use('/rss', require('./routes/rss'));
app.use('/projects', require('./routes/projects')); // ✅ Projects route

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
