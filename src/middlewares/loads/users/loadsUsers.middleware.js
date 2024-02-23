import DAOs from "../../../models/daos/index.daos.js";
import ValidationError from "../../../services/errors/validationError.js";
import {
      UserService
} from "../../../services/users/users.services.js";

export async function loadUserByParams(req, res, next) {

      try {

            const userId = req.params.id;

            if (!userId) {

                  throw {
                        statusCode: 400,
                        message: "Error al obtener el usuario",
                        errors: ["El id del usuario es requerido"],
                  }

            }

            const user = await new UserService().loadUser(userId);

            req.user = user;

            next();

      } catch (error) {

            next(new ValidationError(error));

      }

}