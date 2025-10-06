const redis = require('redis');
const logger = require('./logger');

let client = null;

const initRedis = async () => {
  if (process.env.REDIS_URL) {
    try {
      client = redis.createClient({
        url: process.env.REDIS_URL
      });
      
      await client.connect();
      logger.info('Redis connecté');
    } catch (error) {
      logger.error('Erreur connexion Redis:', error);
    }
  }
};

const cache = {
  get: async (key) => {
    if (!client) return null;
    try {
      const data = await client.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      logger.error('Erreur cache get:', error);
      return null;
    }
  },

  set: async (key, data, ttl = 3600) => {
    if (!client) return;
    try {
      await client.setEx(key, ttl, JSON.stringify(data));
    } catch (error) {
      logger.error('Erreur cache set:', error);
    }
  },

  del: async (key) => {
    if (!client) return;
    try {
      await client.del(key);
    } catch (error) {
      logger.error('Erreur cache del:', error);
    }
  }
};

module.exports = { initRedis, cache };