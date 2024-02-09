import usersModel from "../../schemas/users.schema.js";
import ValidationError from "../../../services/errors/validationError.js";

export class UsersDAO {

      async getAll() {

            try {

                  const users = await usersModel.find({}).lean();

                  console.log(users);

                  return users;

            } catch (error) {

                  throw new ValidationError(["Error al obtener los usuarios", error]);

            }

      }

      async getOneById(id) {

            try {

                  const user = await usersModel.findById(id).lean();

                  return user;


            } catch (error) {

                  throw new ValidationError(["Error al obtener el usuario", error]);

            }

      }

      async getOneByEmail(email) {

            try {

                  const user = await usersModel.findOne({
                        email
                  }).lean();

                  return user;

            } catch (error) {

                  throw new ValidationError(["Error al obtener el usuario", error]);

            }

      }

}