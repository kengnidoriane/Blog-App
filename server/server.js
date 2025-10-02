require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss');
const database = require('./db/database');
const initializeSocket = require('./config/socket');
// importation des routes
const ArticleRouter = require('./routes/articlesRoutes');
const CommentRouter = require('./routes/commentRoutes');
const UserRouter = require('./routes/userRoutes');
const NotificationRouter = require('./routes/notificationRoutes');


const app = express();
const server = http.createServer(app);

// appel fonction pour connection a la base de donne
database;

// Initialisation WebSocket
const io = initializeSocket(server);
app.set('io', io);

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: {
    error: 'Trop de requêtes depuis cette IP',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false
});

// middleware globaux
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(morgan('tiny'));
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

// Route par défaut pour vérifier le bon fonctionnement de l'API
app.get('/api', (req, res) => {
  res.status(200).json({message: 'Blog API is running', version: '1.0.0'});
});

// Middleware de gestion d'erreurs 404
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route non trouvée' });
});

// Middleware de gestion d'erreurs globale
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).json({
    message: error.message || 'Erreur interne du serveur',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// demarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`App is running at port ${PORT}...`)
)





