const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    status: 'Healthy',
    uptime: `${Math.floor(process.uptime())} seconds`,
    memory: `${Math.round(process.memoryUsage().heapUsed/1024/1024)} MB`,
    timestamp: new Date().toISOString()
  });
});

// Detailed health check
router.get('/detailed', (req, res) => {
  const memUsage = process.memoryUsage();
  res.json({
    status: 'Healthy',
    uptime: process.uptime(),
    memory: {
      heapUsed: `${Math.round(memUsage.heapUsed/1024/1024)} MB`,
      heapTotal: `${Math.round(memUsage.heapTotal/1024/1024)} MB`,
      external: `${Math.round(memUsage.external/1024/1024)} MB`,
      rss: `${Math.round(memUsage.rss/1024/1024)} MB`
    },
    platform: process.platform,
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;