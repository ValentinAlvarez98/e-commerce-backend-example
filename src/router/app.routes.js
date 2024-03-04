import {
      Router
} from "express";

import usersRouter from "./users/users.routes.js";
import viewsRouter from "./views/views.routes.js";

import {
      configureRateLimiter
} from "../middlewares/rateLimiter/rateLimiter.middleware.js";

// Cambiado para aceptar `app` como argumento y hacer la función asíncrona
async function setupRoutes(app) {
      const router = Router();
      const rateLimiter = await configureRateLimiter(); // Espera a que el rateLimiter esté listo

      router.use("/views", viewsRouter);
      router.use('/api', rateLimiter); // Aplica el rateLimiter configurado
      router.use("/api/users", usersRouter);

      app.use('/', router); // Aplica el router a la aplicación Express
}

export default setupRoutes;