const express = require('express');
const bodyParser = require('body-parser');
const aiRouter = require('./ai/toolRouter');
const securityRouter = require('./security/accessControl');
const { logRequest, logError } = require('./utils/logger');

const app = express();

// Middleware for logging and body parsing
app.use(bodyParser.json());
app.use(logRequest);  // Custom middleware to log requests

// Security middleware
app.use(securityRouter);

// AI handling routes
app.use('/ai', aiRouter);

// Error handling
app.use((err, req, res, next) => {
  logError(err);
  res.status(500).send({ message: 'Internal Server Error' });
});

app.listen(3000, () => {
  console.log('Backend is running on port 3000');
});