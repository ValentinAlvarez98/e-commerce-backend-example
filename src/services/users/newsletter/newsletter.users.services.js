import DAOs from "../../../models/daos/index.daos.js";

import {
      ClientUserService
} from "../client/client.users.services.js";

const clientService = new ClientUserService();

export class NewsletterService {

      async checkSuscribedByEmail(email) {

            try {

                  const result = await DAOs.newsletter.getOne(email);

                  return result;

            } catch (error) {

                  throw error;

            }

      }

      async checkSuscribedById(user_id) {

            try {

                  const result = await DAOs.newsletter.getOneById(user_id);

                  return result;

            } catch (error) {

                  throw error;

            }

      }

      async getAll() {

            try {

                  const result = await DAOs.newsletter.getAll();

                  return result;

            } catch (error) {

                  throw error;

            }

      }

      async getAllSuscribedEmails() {

            try {

                  const result = await DAOs.newsletter.getAllSuscribed();

                  return result;

            } catch (error) {

                  throw error;

            }

      }

      async suscribeNoRegisted(email) {

            try {

                  const isSuscribed = await this.checkSuscribedByEmail(email);

                  if (isSuscribed) {

                        throw {
                              statusCode: 400,
                              message: "Error al suscribirse",
                              errors: ["El email ingresado ya se encuentra suscripto"]
                        }

                  }

                  const result = await DAOs.newsletter.addOneNoRegisted(email);

                  return result;

            } catch (error) {

                  throw error;

            }

      }

      async suscribeRegisted(email, user_id) {

            try {

                  const isSuscribed = await this.checkSuscribedById(user_id);

                  if (isSuscribed) {

                        throw {
                              statusCode: 400,
                              message: "Error al suscribirse",
                              errors: ["El usuario ya se encuentra suscripto"]
                        }

                  }

                  const result = await DAOs.newsletter.addOneRegisted(email, user_id);

                  return result;

            } catch (error) {

                  throw error;

            }

      }


}