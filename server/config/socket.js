const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  // Middleware d'authentification pour Socket.IO
  io.use(async (socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Token manquant'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        return next(new Error('Utilisateur non trouvé'));
      }

      socket.userId = user._id.toString();
      socket.user = user;
      next();
    } catch (error) {
      next(new Error('Token invalide'));
    }
  });

  io.on('connection', (socket) => {
    console.log(`Utilisateur connecté: ${socket.user.username}`);
    
    // Rejoindre une room personnelle
    socket.join(socket.userId);

    socket.on('disconnect', () => {
      console.log(`Utilisateur déconnecté: ${socket.user.username}`);
    });
  });

  return io;
};

module.exports = initializeSocket;