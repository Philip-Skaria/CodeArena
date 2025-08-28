const express = require('express');
const platformsRouter = require('./platforms');
const healthRouter = require('./health');

const router = express.Router();

// API routes
router.use('/platforms', platformsRouter);
router.use('/health', healthRouter);

// Root route
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to CodeArena API',
    status: 'server is running perfectly',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      platforms: '/api/platforms',
      health: '/api/health'
    }
  });
});

module.exports = router; 