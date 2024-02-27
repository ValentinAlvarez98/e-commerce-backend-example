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
      authMiddleware
} from "../../middlewares/auth/auth.middleware.js";

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

usersRouter.put("/updateOne/basicInfo", validateBasicData, authMiddleware, loadByJWT, clientController.updateBasicInfo.bind(clientController));

usersRouter.put("/updateOne/add/shipping_addresses", validateAddressData, authMiddleware, loadByJWT, limitShippingAddress, clientController.addAddressGeneric.bind(clientController));

usersRouter.put("/updateOne/add/billing_addresses", validateAddressData, authMiddleware, loadByJWT, limitBillingAddress, clientController.addAddressGeneric.bind(clientController));

usersRouter.put("/updateOne/delete/:type/:aId", authMiddleware, loadByJWT, clientController.deleteAddressGeneric.bind(clientController));

usersRouter.delete("/deleteOne", authMiddleware, clientController.deleteOne.bind(clientController));

/* ------------------------- */

usersRouter.get("/logout/:id", async (req, res) => {

      try {

            const userId = req.params.id;

            /* const session = req.session.user;

            if (!session) {

                  return res.status(400).json({
                        status: "error",
                        message: "Session not found"
                  })

            } */

            /* const user = await usersModel.findOne({
                  email: session.email
            }).lean();
                  */

            const user = await DAOs.users.getOneById(userId);

            if (!user) {

                  return res.status(400).json({
                        status: "error",
                        message: "User not found"
                  })

            }

            const oldConnection = user.last_connection;

            const newConnection = {
                  last_login: oldConnection.last_login ? new Date(oldConnection.last_login).toISOString() : null,
                  last_logout: new Date().toISOString(),
                  last_modification: oldConnection.last_modification ? new Date(oldConnection.last_modification).toISOString() : null
            };

            const userToUpdate = {
                  ...user,
                  last_connection: newConnection
            }

            const userLoggedOut = await DAOs.users.updateOne(user._id, userToUpdate);

            /* req.session.destroy(); */

            res.status(200).json({
                  status: "success",
                  message: "User logged out",
                  payload: {
                        ...userLoggedOut._doc,
                        password: null
                  }
            })


      } catch (error) {

            res.status(400).json({
                  status: "error",
                  message: "Logout error",
                  payload: error
            })

      }

});


export default usersRouter;