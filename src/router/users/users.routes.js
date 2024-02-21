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
      validateUserToRegister,
      validateBasicData,
      validateAddressData,
} from "../../middlewares/validations/users/users.validations.middleware.js";

import {
      validateEmail
} from "../../middlewares/validations/validations.middleware.js";


const usersRouter = Router();

usersRouter.get("/getAll", UsersController.getAll);

usersRouter.get("/getOne/:id", UsersController.getOneById);

usersRouter.get("/getOneByEmail", validateEmail, UsersController.getOneByEmail);

usersRouter.post("/addOne", validateUserToRegister, UsersController.addOne);

usersRouter.put("/updateOne/basicInfo/:id", validateBasicData, UsersController.updateOneBasicInfo);

usersRouter.put("/updateOne/shipping_addresses/:id", validateAddressData, UsersController.updateOneShippingAddresses);

usersRouter.put("/updateOne/billing_addresses/:id", validateAddressData, UsersController.updateOneBillingAddresses);

usersRouter.delete("/deleteOne/:id", UsersController.deleteOne);

usersRouter.delete("/deleteInactives", UsersController.deleteInactives);

usersRouter.post("/login", async (req, res) => {

      try {

            const {
                  email,
                  password
            } = req.body;

            const user = await DAOs.users.getOneByEmail(email);

            if (!user) {

                  return res.status(400).json({
                        status: "error",
                        message: "User not found"
                  })

            }

            const compare = compareHash(password, user.password);

            if (!compare) {

                  return res.status(400).json({
                        status: "error",
                        message: "Password incorrect"
                  })

            }

            const oldConnection = user.last_connection;

            const newConnection = {
                  last_login: new Date().toISOString(),
                  last_logout: oldConnection.last_logout ? new Date(oldConnection.last_logout).toISOString() : null,
                  last_modification: oldConnection.last_modification ? new Date(oldConnection.last_modification).toISOString() : null
            };

            const userToUpdate = {
                  ...user,
                  last_connection: newConnection,
            }

            const loggedUser = await DAOs.users.updateOne(user._id, userToUpdate);

            req.session.user = {
                  email: loggedUser.email,
                  _id: loggedUser._id,
                  role: loggedUser.role
            }

            res.status(200).json({

                  status: "success",
                  message: "User logged in",
                  payload: {
                        ...loggedUser._doc,
                        password: null
                  }

            })

      } catch (error) {

            console.log(error);

            res.status(400).json({
                  status: "error",
                  message: "Login error",
                  payload: error
            })

      }

});

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