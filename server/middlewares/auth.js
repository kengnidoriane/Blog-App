const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  try {
    let token;
    
    // Vérification du header Authorization
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token d'accès requis"
      });
    }

    // Vérification et décodage du token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Vérification de l'expiration
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        success: false,
        message: "Token expiré"
      });
    }

    // Récupération de l'utilisateur
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Utilisateur non trouvé"
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Erreur authentification:', error.message);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: "Token invalide"
      });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: "Token expiré"
      });
    }
    
    res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

// Middleware pour vérifier les rôles (pour usage futur)
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Accès non autorisé"
      });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "Accès interdit"
      });
    }
    
    next();
  };
};

module.exports = { protect, authorize };