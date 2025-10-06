const express = require('express');
const router = express.Router();
const seoController = require('../controllers/seoController');

router.get('/sitemap.xml', seoController.generateSitemap);
router.get('/robots.txt', seoController.generateRobots);

module.exports = router;