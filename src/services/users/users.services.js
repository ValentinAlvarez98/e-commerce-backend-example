import DAOs from "../../models/daos/index.daos.js";
import {
      compareHash,
      createHash
} from "../../utils/bcrypt/bcrypt.utils.js";
import {
      generateJWT
} from "../../utils/JWT/jwt.utils.js";

export class UserService {

      async loadUser(id) {

            const dbResponse = await DAOs.users.getOneById(id);

            if (!dbResponse) {

                  throw {
                        statusCode: 404,
                        message: "Error al obtener el usuario",
                        errors: ["El usuario no existe"],
                  }

            }

            return dbResponse;

      }

      async generateToken(id) {

            const token = generateJWT(id);

            if (!token) {

                  throw {
                        statusCode: 404,
                        message: "Error al crear el token",
                        errors: ["No se pudo crear el token"],
                  }

            }

            return token;

      }

      async updateActivity(id) {

            const now = new Date();

            const dbResponse = await DAOs.users.updateOne(id, {
                  last_activity: now
            });

            if (dbResponse.errors) {

                  throw {
                        statusCode: 404,
                        message: "Error al actualizar la actividad",
                        errors: ["No se pudo actualizar la actividad del usuario"],
                  }

            }

            return dbResponse;

      }

      async findInactiveUsers() {

            const users = await DAOs.users.getAll();
            const now = new Date();

            return users.filter(user => {

                  const last_activity = user.last_activity;

                  const mostRecentTime = [last_activity].filter(time => time !== null).sort((a, b) => b - a)[0];

                  return now - mostRecentTime > 10000;

            }).map(user => user._id);
      }

      async deleteInactiveUsers(userIds) {

            return await DAOs.users.deleteMany(userIds);

      }

      async loginUser(email, password) {

            const user = await DAOs.users.getOneByEmail(email);

            if (!user) {

                  throw {
                        statusCode: 404,
                        message: "Error al iniciar sesión",
                        errors: ["El usuario no existe"],
                  }

            }

            const isPasswordCorrect = compareHash(password, user.password);

            if (!isPasswordCorrect) {

                  throw {
                        statusCode: 404,
                        message: "Error al iniciar sesión",
                        errors: ["La contraseña es incorrecta"],
                  }

            }

            const loggedUser = await this.updateActivity(user._id);

            return loggedUser;

      }

}