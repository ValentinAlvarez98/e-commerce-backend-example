import DAOs from "../../models/daos/index.daos.js";
import ValidationError from "../../services/errors/validationError.js";
import ControllerError from "../../services/errors/controllerError.js";

import {
      createHash,
      compareHash
} from "../../utils/bcrypt/bcrypt.utils.js";

import {
      UserService
} from "../../services/users/users.services.js";

import {
      successResponse,
      errorResponse
} from "../../utils/responses/responses.utils.js";

const userService = new UserService();

export class UsersController {

      constructor() {

            this.formattedSuccessRes = this.formattedSuccessRes.bind(this);

            this.formattedErrorRes = this.formattedErrorRes.bind(this);

      }

      formattedSuccessRes(res, statusCode, message, payload) {

            const response = successResponse(statusCode, message, payload);

            res.status(statusCode).json(response);

      }

      formattedErrorRes(res, statusCode, message, error) {

            const response = errorResponse(statusCode, message, error);

            res.status(statusCode).json(response);

      }

      async getAll(req, res, next) {

            try {

                  const users = await DAOs.users.getAll();

                  this.formattedSuccessRes(res, 200, "Usuarios encontrados", users);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async getOneById(req, res, next) {

            try {

                  const userId = req.params.id;

                  const response = await DAOs.users.getOneById(userId);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId}`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async getOneByEmail(req, res, next) {

            try {

                  const email = req.body.email;

                  const response = await DAOs.users.getOneByEmail(email);

                  this.formattedSuccessRes(res, 200, `Usuario con email ${email}`, response);


            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async addOne(req, res, next) {

            try {

                  const enteredUser = req.body;

                  const hashedPassword = createHash(enteredUser.password);

                  const userToAdd = {
                        ...enteredUser,
                        password: hashedPassword,
                        last_activity: new Date().toISOString(),
                  }

                  const response = await DAOs.users.addOne(userToAdd);

                  this.formattedSuccessRes(res, 201, `Usuario ${response.email} creado`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async updateOneBasicInfo(req, res, next) {

            try {

                  const userId = req.user._id

                  const newUserData = req.body;

                  // Esta funcion se puede reutilizar en otros controladores
                  for (const key in newUserData) {
                        if (newUserData[key] === "") {
                              delete newUserData[key];
                        }
                  }

                  const oldUser = req.user

                  const newUser = {
                        ...oldUser,
                        ...newUserData,
                        last_connection: new Date().toISOString()
                  }

                  const response = await DAOs.users.updateOne(userId, newUser);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId} actualizado`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async updateOneShippingAddresses(req, res, next) {

            try {

                  const userId = req.params.id;

                  const newAddress = req.body;

                  const oldUser = await DAOs.users.getOneById(userId)

                  const oldAddresses = oldUser.shipping_addresses;

                  if (oldAddresses.length >= 3) {

                        throw {
                              statusCode: 400,
                              message: "Error al agregar dirección de envío",
                              errors: ["No se pueden agregar más de 3 direcciones de envío"]
                        }

                  }

                  oldAddresses.push(newAddress);

                  const newUser = {
                        ...oldUser,
                        shipping_addresses: oldAddresses,
                        last_connection: new Date().toISOString()
                  }

                  const response = await DAOs.users.updateOne(userId, newUser);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId} actualizado`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async updateOneBillingAddresses(req, res, next) {

            try {

                  const userId = req.params.id;

                  const newAddress = req.body;

                  const oldUser = await DAOs.users.getOneById(userId)

                  const oldAddresses = oldUser.billing_addresses;

                  if (oldAddresses.length >= 1) {

                        throw new ValidationError(["No se pueden agregar más de 1 direccion de facturación"]);

                  }

                  oldAddresses.push(newAddress);

                  const newUser = {
                        ...oldUser,
                        billing_addresses: oldAddresses,
                        last_connection: new Date().toISOString()
                  }

                  const response = await DAOs.users.updateOne(userId, newUser);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId} actualizado`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async deleteOne(req, res, next) {

            try {

                  const userId = req.params.id;

                  const response = await DAOs.users.deleteOne(userId);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId} eliminado`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async deleteInactives(req, res, next) {

            try {

                  const inactiveUsersIds = await userService.findInactiveUsers();

                  if (inactiveUsersIds.length > 0) {

                        const deletedUsers = await userService.deleteInactiveUsers(inactiveUsersIds);

                        this.formattedSuccessRes(res, 200, "Usuarios inactivos eliminados", deletedUsers);

                  } else {

                        throw new ControllerError(400, "No hay usuarios inactivos", ["No hay usuarios inactivos"]);

                  }

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async login(req, res, next) {

            try {

                  const {
                        email,
                        password
                  } = req.body;

                  const user = await userService.loginUser(email, password);

                  this.formattedSuccessRes(res, 200, "Usuario logueado", user);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

}

export default UsersController;