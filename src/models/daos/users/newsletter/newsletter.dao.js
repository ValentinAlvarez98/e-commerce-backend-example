import isEmail from "validator/lib/isEmail.js";
import NewsletterModel from "../../../schemas/newsletter.schema.js";

export class NewsletterDAO {

      async getAll() {

            try {

                  const users = await NewsletterModel.find({}).lean();

                  return users;

            } catch (error) {

                  throw {
                        statusCode: 404,
                        message: "Error al obtener los usuarios ingresados",
                        errors: error
                  }

            }

      }

      async getAllSuscribed() {

            try {

                  const users = await NewsletterModel.find({
                        is_subscribed: true
                  }, 'email').lean()

                  return users;

            } catch (error) {

                  throw {
                        statusCode: 404,
                        message: "Error al obtener los usuarios ingresados suscriptos",
                        errors: error
                  }

            }

      }

      async getOne(email) {

            try {

                  const user = await NewsletterModel.findOne({
                        email
                  }).lean();

                  return user;

            } catch (error) {

                  throw {
                        statusCode: 404,
                        message: "Error al obtener el usuario ingresado",
                        errors: error
                  }

            }

      }

      async getOneById(id) {

            try {

                  const user = await NewsletterModel.findOne({
                        user_id: id
                  }).lean()

                  return user;

            } catch (error) {

                  throw {
                        statusCode: 404,
                        message: "Error al obtener el usuario ingresado",
                        errors: error
                  }

            }

      }

      async addOneNoRegisted(email) {

            try {

                  const newUser = new NewsletterModel({
                        email
                  });

                  await newUser.save();

                  return {
                        email
                  };

            } catch (error) {

                  throw error;

            }

      }

      async addOneRegisted(email, user_id) {

            try {

                  const newUser = new NewsletterModel({
                        email,
                        user_id
                  });

                  await newUser.save();

                  return {
                        email
                  };

            } catch (error) {

                  throw error;

            }

      }

}