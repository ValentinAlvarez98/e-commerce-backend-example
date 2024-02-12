import usersModel from "../../schemas/users.schema.js";
import DatabaseError from "../../../services/errors/databaseError.js";

// A mover al DTO
import ValidationError from "../../../services/errors/validationError.js";
export class UsersDAO {

      async getAll() {

            try {

                  const users = await usersModel.find({}).lean();

                  return users;

            } catch (error) {

                  throw new DatabaseError("Error al obtener los usuarios", error);

            }

      }

      async getOneById(id) {

            try {

                  const user = await usersModel.findById(id).lean();

                  return user;


            } catch (error) {

                  throw new DatabaseError("Error al obtener el usuario por su ID", error);

            }

      }

      async getOneByEmail(email) {

            try {

                  const user = await usersModel.findOne({
                        email
                  }).lean();

                  if (!user) throw new ValidationError(["No se ha encontrado el usuario con el email ingresado"]);

                  return user;

            } catch (error) {

                  throw new DatabaseError("Error al obtener el usuario por su email", error);

            }

      }

      async addOne(user) {

            try {

                  const newUser = new usersModel(user);

                  await newUser.save();

                  return newUser;

            } catch (error) {

                  throw new DatabaseError("Error al agregar el usuario", error);

            }

      };

      async updateOne(id, user) {

            try {

                  const updatedUser = await usersModel.findByIdAndUpdate(id, user, {
                        new: true
                  });

                  return updatedUser;

            } catch (error) {

                  throw new DatabaseError("Error al actualizar el usuario", error);

            }

      };

      async deleteOne(id) {

            try {

                  const deletedUser = await usersModel.findByIdAndDelete(id);

                  return deletedUser;

            } catch (error) {

                  throw new DatabaseError("Error al eliminar el usuario", error);

            }

      };

      async deleteMany(ids) {

            try {

                  const deletedUsers = await usersModel.deleteMany({
                        _id: {
                              $in: ids
                        }
                  });

                  return deletedUsers;

            } catch (error) {

                  throw new DatabaseError("Error al eliminar los usuarios", error);

            }

      }

}