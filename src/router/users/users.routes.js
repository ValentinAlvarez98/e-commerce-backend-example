import {
      Router
} from "express";

import {
      AdministrationUsersController as AdminController
} from "../../controllers/users/administration/administration.users.controller.js";
import {
      ClientUsersController as ClientController
} from "../../controllers/users/client/client.users.controller.js";
import DAOs from "../../models/daos/index.daos.js";

import {
      createHash,
      compareHash
} from "../../utils/bcrypt/bcrypt.utils.js";

import {
      validateLogin,
      validateUserToRegister,
      validateBasicData,
      validateAddressData,
      limitShippingAddress,
      limitBillingAddress
} from "../../middlewares/validations/users/users.validations.middleware.js";

import {
      validateEmail
} from "../../middlewares/validations/validations.middleware.js";

import {
      loadUserByParams as loadByParams,
      loadUserByJWT as loadByJWT
} from "../../middlewares/loads/users/loadsUsers.middleware.js";

import {
      authMiddleware,
      authFromCookieMiddleware as authFromCookie
} from "../../middlewares/auth/auth.middleware.js";

import newsletterRouter from "./newsletter/newsletter.users.routes.js";

const adminController = new AdminController();
const clientController = new ClientController();

const usersRouter = Router();

/* Funciones administrativas */
/* ------------------------- */
usersRouter.get("/getAll", adminController.getAll.bind(adminController));

usersRouter.get("/getOne/:id", adminController.getOneById.bind(adminController));

usersRouter.get("/getOneByEmail", validateEmail, adminController.getOneByEmail.bind(adminController));

usersRouter.delete("/deleteInactives", adminController.deleteInactives.bind(adminController));
/* ------------------------- */

/* Funciones de cliente */
/* ------------------------- */
usersRouter.post("/register", validateUserToRegister, clientController.createOne.bind(clientController));

usersRouter.post("/login", validateLogin, clientController.loginOne.bind(clientController));

usersRouter.get("/checkSession", authFromCookie, loadByJWT, clientController.checkSession.bind(clientController));

usersRouter.get("/logout", authFromCookie, clientController.logout.bind(clientController));

usersRouter.post("/sendWholeSales", clientController.sendWholeSales.bind(clientController));

usersRouter.put("/updateOne/basicInfo", validateBasicData, authMiddleware, loadByJWT, clientController.updateBasicInfo.bind(clientController));

usersRouter.put("/updateOne/add/shipping_addresses", validateAddressData, authMiddleware, loadByJWT, limitShippingAddress, clientController.addAddressGeneric.bind(clientController));

usersRouter.put("/updateOne/add/billing_address", validateAddressData, authMiddleware, loadByJWT, limitBillingAddress, clientController.addAddressGeneric.bind(clientController));

usersRouter.put("/updateOne/delete/:type/:aId", authMiddleware, loadByJWT, clientController.deleteAddressGeneric.bind(clientController));

usersRouter.delete("/deleteOne", authMiddleware, clientController.deleteOne.bind(clientController));
/* ------------------------- */

/* Funciones de newsletter */
/* ------------------------- */
usersRouter.use("/newsletter", newsletterRouter);


export default usersRouter;