require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const database = require('./db/database');
// importation des routes
const ArticleRouter = require('./routes/articlesRoutes');
const CommentRouter = require('./routes/commentRoutes');
const UserRouter = require('./routes/userRoutes');


const app = express();

// appel fonction pour connection a la base de donne
database;

// Configuration du rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite chaque IP à 100 requêtes par windowMs
  message: 'Trop de requêtes depuis cette IP, réessayez plus tard.'
});

// middleware globaux
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'));
app.use(limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// definition des route pour l'application
app.use('/api/articles', ArticleRouter);
app.use('/api/articles/:articleId/comments', CommentRouter);
app.use('/api/user', UserRouter);

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
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App is running at port ${PORT}...`)
)





