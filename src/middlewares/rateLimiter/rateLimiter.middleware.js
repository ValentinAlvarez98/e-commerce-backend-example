import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import {
      RedisManager
} from '../../models/manager/redis.manager.js';

export async function configureRateLimiter() { // Asegúrate de exportar la función
      const redisClient = await RedisManager.getClient();

      return rateLimit({
            store: new RedisStore({
                  sendCommand: (...args) => redisClient.sendCommand(args),
            }),
            windowMs: 15 * 60 * 1000, // 15 minutos
            max: 100, // límite de 100 solicitudes por IP por ventana de tiempo
            standardHeaders: true, // devuelve información de límite de tasa en los encabezados 'RateLimit-*'
            legacyHeaders: false, // deshabilita los encabezados 'X-RateLimit-*'

            // configurar el mensaje de error
            message: {
                  status: 429,
                  statusCode: 429,
                  error: true,
                  message: 'Exceso de solicitudes desde esta IP, intente nuevamente en 15 minutos.',
                  errors: [
                        'Se ha excedido el límite de solicitudes. Intente nuevamente en 15 minutos.'
                  ]
            },
      });
}