require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const database = require('./db/database');
// importation des routes
const ArticleRouter = require('./routes/articlesRoutes');
const CommentRouter = require('./routes/commentRoutes');
const UserRouter = require('./routes/userRoutes');


const app = express();

// appel fonction pour connection a la base de donne
database;

// middleware globaux
app.use(cors());
app.use(helmet());
app.use(morgan('tiny'))
app.use(express.json())

// definition des route pour l'application
app.use('/api/articles', ArticleRouter );
app.use('/api/article/:id/comment', CommentRouter );
app.use('/api/user', UserRouter );

// Route par défaut pour vérifier le bon fonctionnement de l'API
app.get('/api', (req, res) => {
  res.status(200).json({message: 'Hello World'})
});

// demarrage du serveur
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`App is running at port ${PORT}...`)
)





