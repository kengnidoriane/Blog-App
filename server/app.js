require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const compression = require('compression');
const fs = require('fs');
const database = require('./db/database');
const corsOptions = require('./config/cors');
const logger = require('./config/logger');

// importation des routes
const ArticleRouter = require('./routes/articlesRoutes');
const CommentRouter = require('./routes/commentRoutes');
const UserRouter = require('./routes/userRoutes');
const NotificationRouter = require('./routes/notificationRoutes');
const HealthRouter = require('./routes/healthRoutes');
const SeoRouter = require('./routes/seoRoutes');

const app = express();

// Créer le dossier logs s'il n'existe pas
if (!fs.existsSync('logs')) {
  fs.mkdirSync('logs');
}

// appel fonction pour connection a la base de donne
database;

// Initialisation Redis (désactivé sur Vercel)
if (process.env.VERCEL !== '1') {
  const { initRedis } = require('./config/cache');
  initRedis();
}

// Mock IO pour Vercel
const mockIo = { emit: () => {}, to: () => ({ emit: () => {} }) };
app.set('io', mockIo);

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Too many requests from this IP',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false
});

// middleware globaux
app.use(compression());
app.use(cors(corsOptions));
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));
app.use(morgan('combined', { stream: { write: message => logger.info(message.trim()) } }));
app.use(limiter);
app.use(mongoSanitize());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middleware XSS
app.use((req, res, next) => {
  if (req.body && typeof req.body === 'object') {
    for (let key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }
  next();
});

// definition des route pour l'application
app.use('/api/articles', ArticleRouter);
app.use('/api/articles/:articleId/comments', CommentRouter);
app.use('/api/user', UserRouter);
app.use('/api/notifications', NotificationRouter);
app.use('/api', HealthRouter);
app.use('/', SeoRouter);

// Route par défaut pour vérifier le bon fonctionnement de l'API
app.get('/api', (req, res) => {
  res.status(200).json({message: 'Blog API is running', version: '1.0.0'});
});

// Middleware de gestion d'erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Middleware de gestion d'erreurs globale
app.use((error, req, res, next) => {
  logger.error(error.message, { stack: error.stack, url: req.url, method: req.method });
  
  res.status(error.status || 500).json({
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

module.exports = app;