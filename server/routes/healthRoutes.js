const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/health', async (req, res) => {
  const healthCheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now(),
    checks: {
      database: 'unknown',
      memory: process.memoryUsage(),
      cpu: process.cpuUsage()
    }
  };

  try {
    // Vérifier la connexion à la base de données
    if (mongoose.connection.readyState === 1) {
      healthCheck.checks.database = 'connected';
    } else {
      healthCheck.checks.database = 'disconnected';
      healthCheck.message = 'Database connection issue';
    }

    const status = healthCheck.checks.database === 'connected' ? 200 : 503;
    res.status(status).json(healthCheck);
  } catch (error) {
    healthCheck.message = 'Error';
    healthCheck.checks.database = 'error';
    res.status(503).json(healthCheck);
  }
});

router.get('/metrics', (req, res) => {
  res.json({
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    cpu: process.cpuUsage(),
    version: process.version,
    platform: process.platform
  });
});

module.exports = router;