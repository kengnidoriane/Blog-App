const jwt = require('jsonwebtoken');

// middleware d'authentification pour verifier le token

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({message: 'Acces refuse. Aucun token fourni.'});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({message: 'Token invalide'});
  }
}

module.exports = { verifyToken }
