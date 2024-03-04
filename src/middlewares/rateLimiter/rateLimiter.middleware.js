import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {
      RedisManager
} from '../../models/manager/redis.manager.js';

export async function configureRateLimiter() {
      const redisClient = await RedisManager.getClient();

      return rateLimit({
            store: new RedisStore({
                  sendCommand: (...args) => redisClient.sendCommand(args),
            }),
            windowMs: 5 * 60 * 1000, // 5 minutos
            max: 150, // límite de 150 solicitudes por IP por ventana de tiempo
            standardHeaders: true,
            legacyHeaders: false,


            message: {
                  status: 429,
                  statusCode: 429,
                  error: true,
                  message: 'Exceso de solicitudes desde esta IP, intente nuevamente en 5 minutos.',
                  errors: [
                        'Se ha excedido el límite de solicitudes. Intente nuevamente en 5 minutos.'
                  ]
            },
      });
}