const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// GET / - Return a welcome message
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the Express Server!');
});

// GET /about - Return JSON containing student name and section
app.get('/about', (req, res) => {
  res.status(200).json({
    name: 'RAJAMONI NAVEEN',
    section: 'CSE-2D'
  });
});

// GET /time - Return the current date and time using new Date()
app.get('/time', (req, res) => {
  const currentDateTime = new Date();
  res.status(200).json({
    currentTime: currentDateTime.toISOString(),
    formatted: currentDateTime.toString()
  });
});

// 404 handler for any undefined routes
app.use((req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: `Cannot ${req.method} ${req.url}`
  });
});

// Start listening
app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});

