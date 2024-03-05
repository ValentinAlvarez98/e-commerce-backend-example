import {
      Router
} from "express";

import {
      NewsletterController
} from "../../../controllers/users/newsletter/newsletter.users.controller.js";

import {
      loadUserByJWT as loadByJWT
} from "../../../middlewares/loads/users/loadsUsers.middleware.js";

import {
      authMiddleware
} from "../../../middlewares/auth/auth.middleware.js";

const newsletterController = new NewsletterController();

const newsletterRouter = Router();

/* Funciones administrativas */
/* ------------------------- */
newsletterRouter.get("/getAll", newsletterController.getAll.bind(newsletterController));

newsletterRouter.get("/getAllSuscribedEmails", newsletterController.getAllSuscribedEmails.bind(newsletterController));

/* Funciones de cliente */
/* ------------------------- */
newsletterRouter.post("/suscribe/noRegisted", newsletterController.suscribeNoRegisted.bind(newsletterController));

newsletterRouter.post("/suscribe/registed", authMiddleware, loadByJWT, newsletterController.suscribeRegisted.bind(newsletterController));

export default newsletterRouter;