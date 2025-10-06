const http = require('http');
const app = require('./app');
const initializeSocket = require('./config/socket');
const logger = require('./config/logger');
const { initRedis } = require('./config/cache');

const server = http.createServer(app);

// Initialisation Redis pour développement local
initRedis();

// Initialisation WebSocket pour développement local
const io = initializeSocket(server);
app.set('io', io);

// demarrage du serveur
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  logger.info(`Serveur démarré sur le port ${PORT}`);
  console.log(`App is running at port ${PORT}...`);
})





