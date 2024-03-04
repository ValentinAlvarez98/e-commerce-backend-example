import {
      createClient
} from 'redis';

import CONFIG from '../../environments/config.js';

import {
      sendErrorDBEmail
} from '../../utils/mailing/mailing.utils.js';

export class RedisManager {
      static #instancePromise;
      static #maxRetries = 5;
      static #retryDelay = 2000;

      static async connectToDatabase(retries = this.#maxRetries, delay = this.#retryDelay) {
            const redisClient = createClient({
                  password: CONFIG.REDIS.password,
                  socket: {
                        host: CONFIG.REDIS.host,
                        port: CONFIG.REDIS.port
                  }
            });


            await redisClient.connect();
            console.log('Base de datos Redis, conectada');
            return redisClient;
      }

      static start() {
            if (!this.#instancePromise) {
                  this.#instancePromise = this.connectToDatabase();
            }
            return this.#instancePromise;
      }

      static async getClient() {
            if (!this.#instancePromise) {
                  await this.start();
            }
            return this.#instancePromise;
      }
}