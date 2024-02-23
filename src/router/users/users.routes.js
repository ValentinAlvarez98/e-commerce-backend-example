import {
      Router
} from "express";

import UsersController from "../../controllers/users/users.controller.js";
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
} from "../../middlewares/validations/users/users.validations.middleware.js";

import {
      validateEmail
} from "../../middlewares/validations/validations.middleware.js";

import {
      loadUserByParams as loadByParams
} from "../../middlewares/loads/users/loadsUsers.middleware.js";

const usersController = new UsersController();


const usersRouter = Router();

usersRouter.get("/getAll", usersController.getAll.bind(usersController));

usersRouter.get("/getOne/:id", usersController.getOneById);

usersRouter.get("/getOneByEmail", validateEmail, usersController.getOneByEmail);

usersRouter.post("/addOne", validateUserToRegister, usersController.addOne);

usersRouter.put("/updateOne/basicInfo/:id", validateBasicData, loadByParams, usersController.updateOneBasicInfo);

usersRouter.put("/updateOne/shipping_addresses/:id", validateAddressData, usersController.updateOneShippingAddresses);

usersRouter.put("/updateOne/billing_addresses/:id", validateAddressData, usersController.updateOneBillingAddresses);

usersRouter.delete("/deleteOne/:id", usersController.deleteOne);

usersRouter.delete("/deleteInactives", usersController.deleteInactives);

usersRouter.post("/login", validateLogin, usersController.login);

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