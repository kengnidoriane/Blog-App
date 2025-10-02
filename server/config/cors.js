const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = process.env.CLIENT_URL?.split(',') || ['http://localhost:5173'];
    
    // Permettre les requêtes sans origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Non autorisé par CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400 // 24 heures
};

module.exports = corsOptions;