import DAOs from "../../models/daos/index.daos.js";
import ValidationError from "../../services/errors/validationError.js";

import {
      createHash,
      compareHash
} from "../../utils/bcrypt/bcrypt.utils.js";

import {
      UserService
} from "../../services/users/users.services.js";

const userService = new UserService();

export class UsersController {

      static async getAll(req, res, next) {

            try {

                  const users = await DAOs.users.getAll();

                  res.status(200).json({
                        status: "success",
                        message: "All users",
                        payload: users
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "Users not found",
                        error
                  })

            }

      }

      static async getOneById(req, res, next) {

            try {

                  const userId = req.params.id;

                  const response = await DAOs.users.getOneById(userId);

                  res.status(200).json({
                        status: "success",
                        message: "User found",
                        payload: response
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not found",
                        error
                  })

            }

      }

      static async getOneByEmail(req, res, next) {

            try {

                  const email = req.body.email;

                  const response = await DAOs.users.getOneByEmail(email);

                  res.status(200).json({
                        status: "success",
                        message: "User found",
                        payload: response
                  })


            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not found",
                        error
                  })

            }

      }

      static async addOne(req, res, next) {

            try {

                  const enteredUser = req.body;

                  const hashedPassword = createHash(enteredUser.password);

                  const userToAdd = {
                        ...enteredUser,
                        password: hashedPassword
                  }

                  const response = await DAOs.users.addOne(userToAdd);

                  res.status(200).json({
                        status: "success",
                        message: "User added",
                        payload: response
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not added",
                        payload: error
                  })

            }

      }

      static async updateOneBasicInfo(req, res, next) {

            try {

                  const userId = req.params.id;

                  const newUserData = req.body;

                  // Esta funcion se puede reutilizar en otros controladores
                  for (const key in newUserData) {
                        if (newUserData[key] === "") {
                              delete newUserData[key];
                        }
                  }

                  const oldUser = await DAOs.users.getOneById(userId);

                  const oldConnection = oldUser.last_connection;

                  const newConnection = {
                        last_login: oldConnection.last_login ? new Date(oldConnection.last_login).toISOString() : null,
                        last_logout: oldConnection.last_logout ? new Date(oldConnection.last_logout).toISOString() : null,
                        last_modification: new Date().toISOString()
                  };

                  const age = newUserData.age ? newUserData.age : oldUser.age;

                  const numberAge = parseInt(age);

                  const newUser = {
                        ...oldUser,
                        ...newUserData,
                        age: numberAge,
                        last_connection: newConnection
                  }

                  const response = await DAOs.users.updateOne(userId, newUser);

                  res.status(200).json({
                        status: "success",
                        message: "User updated successfully",
                        payload: response
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not updated",
                        payload: error
                  })

            }

      }

      static async updateOneAddresses(req, res, next) {

            try {

                  const userId = req.params.id;

                  const newAddress = req.body;

                  const oldUser = await DAOs.users.getOneById(userId)

                  const oldAddresses = oldUser.addresses;

                  if (oldAddresses.length >= 3) {

                        throw new ValidationError(["No se pueden agregar más de 3 direcciones"]);

                  }

                  oldAddresses.push(newAddress);

                  const oldConnection = oldUser.last_connection;

                  const newConnection = {
                        last_login: oldConnection.last_login ? new Date(oldConnection.last_login).toISOString() : null,
                        last_logout: oldConnection.last_logout ? new Date(oldConnection.last_logout).toISOString() : null,
                        last_modification: new Date().toISOString()
                  };

                  const newUser = {
                        ...oldUser,
                        addresses: oldAddresses,
                        last_connection: newConnection
                  }

                  const response = await DAOs.users.updateOne(userId, newUser);

                  res.status(200).json({
                        status: "success",
                        message: "User updated successfully",
                        payload: response
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not updated",
                        payload: error
                  })
            }

      }

      static async deleteOne(req, res, next) {

            try {

                  const userId = req.params.id;

                  const response = await DAOs.users.deleteOne(userId);

                  res.status(200).json({
                        status: "success",
                        message: "User deleted",
                        payload: response
                  })

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "User not deleted",
                        payload: error
                  })

            }

      }

      static async deleteInactives(req, res, next) {

            try {

                  const inactiveUsersIds = await userService.findInactiveUsers();

                  if (inactiveUsersIds.length > 0) {

                        const deletedUsers = await userService.deleteInactiveUsers(inactiveUsersIds);

                        res.status(200).json({
                              status: "success",
                              message: "Inactive users deleted",
                              payload: deletedUsers
                        });

                  } else {

                        res.status(200).json({
                              status: "success",
                              message: "No inactive users found",
                              payload: {}
                        });

                  }

            } catch (error) {

                  res.status(400).json({
                        status: "error",
                        message: "Inactive users not deleted",
                        payload: error
                  });

            }

      }

}

export default UsersController;