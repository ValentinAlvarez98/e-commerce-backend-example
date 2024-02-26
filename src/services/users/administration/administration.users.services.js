import DAOs from "../../../models/daos/index.daos.js";
import ValidationError from "../../../services/errors/validationError.js";

import {
      findInactiveUsers
} from "../../../utils/inactives/inactives.utils.js";

import {
      sendInactiveEmail
} from "../../../utils/mailing/mailing.utils.js";

export class AdministrationUserService {

      async getAll() {

            try {

                  const users = await DAOs.users.getAll();

                  if (!users) {

                        throw {
                              statusCode: 404,
                              message: "Error al obtener los usuarios",
                              errors: ["No se encontraron usuarios"],
                        }

                  }

                  return users;

            } catch (error) {

                  throw {
                        statusCode: 500,
                        message: error.message,
                        errors: error.errors
                  }

            }

      }

      async getById(_id) {

            try {

                  const user = await DAOs.users.getOneById(_id);

                  if (!user) {

                        throw {
                              statusCode: 404,
                              message: "Error al obtener el usuario",
                              errors: ["No se encontró el usuario"],
                        }

                  }

                  return user;

            } catch (error) {

                  throw {
                        statusCode: 500,
                        message: error.message,
                        errors: error.errors
                  }

            }

      }

      async getByEmail(email) {

            try {

                  const user = await DAOs.users.getOneByEmail(email);

                  if (!user) {

                        throw {
                              statusCode: 404,
                              message: "Error al obtener el usuario",
                              errors: ["No se encontró el usuario"],
                        }

                  }

                  return user;

            } catch (error) {

                  throw {
                        statusCode: 500,
                        message: error.message,
                        errors: error.errors
                  }

            }

      }

      async deleteInactives() {

            try {

                  const allUsers = await DAOs.users.getAll();

                  const {
                        inactives,
                        count
                  } = findInactiveUsers(allUsers);

                  if (count === 0) {

                        throw {
                              statusCode: 404,
                              message: "Error al eliminar usuarios inactivos",
                              errors: ["No se encontraron usuarios inactivos"],
                        }

                  }

                  const inactiveUsersIds = inactives.map(user => user._id);
                  const inactiveUsersEmails = inactives.map(user => user.email);

                  const deletedUsers = await DAOs.users.deleteMany(inactiveUsersIds);

                  return {
                        emails: inactiveUsersEmails,
                        count,
                        deletedUsers
                  };


            } catch (error) {

                  throw {
                        statusCode: 500,
                        message: error.message,
                        errors: error.errors
                  }

            }

      }

}