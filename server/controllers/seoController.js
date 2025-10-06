const Article = require('../models/Articles');

exports.generateSitemap = async (req, res) => {
  try {
    const articles = await Article.find({})
      .select('_id title createDate')
      .sort({ createDate: -1 })
      .lean();

    const baseUrl = process.env.CLIENT_URL || 'https://devblog.com';
    
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
    <lastmod>${new Date().toISOString()}</lastmod>
  </url>`;

    articles.forEach(article => {
      sitemap += `
  <url>
    <loc>${baseUrl}/post/${article._id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
    <lastmod>${new Date(article.createDate).toISOString()}</lastmod>
  </url>`;
    });

    sitemap += '\n</urlset>';

    res.set('Content-Type', 'application/xml');
    res.send(sitemap);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.generateRobots = (req, res) => {
  const baseUrl = process.env.CLIENT_URL || 'https://devblog.com';
  
  const robots = `User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin

Sitemap: ${baseUrl}/sitemap.xml`;

  res.set('Content-Type', 'text/plain');
  res.send(robots);
};