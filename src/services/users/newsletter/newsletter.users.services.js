import DAOs from "../../../models/daos/index.daos.js";

import {
      ClientUserService
} from "../client/client.users.services.js";

import {
      sendNewsletter
} from "../../../utils/mailing/mailing.utils.js";

const clientService = new ClientUserService();

export class NewsletterService {

      async checkSuscribedByEmail(email) {

            try {

                  const result = await DAOs.newsletter.getOne(email);

                  if (!result) return {
                        added: false,
                        suscribed: false
                  };

                  if (result.is_subscribed) return {
                        added: true,
                        email: result.email,
                        user_id: result.user_id,
                        suscribed: true
                  };

                  if (!result.is_subscribed) return {
                        added: true,
                        email: result.email,
                        user_id: result.user_id,
                        suscribed: false
                  };

                  return {
                        added: false,
                        suscribed: false
                  };

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

      async updateIsSuscribed(email, isSuscribed) {

            try {

                  const result = await DAOs.newsletter.updateIsSuscribed(email, isSuscribed);

                  return result;

            } catch (error) {

                  throw error;


            }

      }

      async deleteOne(email) {

            try {

                  const result = await DAOs.newsletter.deleteOne(email);

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

                  const emails = result.map(user => user.email);

                  return emails;

            } catch (error) {

                  throw error;

            }

      }

      async sendEmail(title, subtitle, section, img, imgDescription, siteURL) {
            try {
                  const emails = await this.getAllSuscribedEmails();

                  const promises = emails.map(email =>
                        // Encapsula cada llamada en una función asíncrona autoinvocada
                        (async () => {
                              try {
                                    // Intenta enviar el newsletter
                                    const response = await sendNewsletter(email, title, subtitle, section, img, imgDescription, siteURL);
                                    // Si tiene éxito, retorna un objeto que representa el éxito
                                    return {
                                          email,
                                          success: true,
                                          response
                                    };
                              } catch (error) {
                                    // Si falla, retorna un objeto que representa el fallo, incluyendo el mensaje de error
                                    return {
                                          email,
                                          success: false,
                                          error: error.message
                                    };
                              }
                        })() // Autoinvocación de la función asíncrona
                  );

                  const result = await Promise.all(promises);

                  console.log(result);

                  return result;
            } catch (error) {
                  throw error;
            }
      }

      async suscribeNoRegisted(email) {

            try {

                  const checkSuscription = await this.checkSuscribedByEmail(email);

                  if (checkSuscription.suscribed) {

                        throw {
                              statusCode: 400,
                              message: "Error al suscribirse",
                              errors: ["El email ingresado ya se encuentra suscripto"]
                        }

                  }

                  if (checkSuscription.added && !checkSuscription.suscribed) {

                        const result = await this.updateIsSuscribed(email, true);

                        return result;

                  }

                  if (!checkSuscription.added) {

                        const result = await DAOs.newsletter.addOneNoRegisted(email);

                        return result;

                  }

            } catch (error) {

                  throw error;

            }

      }

      async suscribeRegisted(email, user_id) {

            try {

                  const checkSuscription = await this.checkSuscribedByEmail(email);

                  if (checkSuscription.suscribed) {

                        throw {
                              statusCode: 400,
                              message: "Error al suscribirse",
                              errors: ["El email ingresado ya se encuentra suscripto"]
                        }

                  }

                  if (checkSuscription.added && !checkSuscription.suscribed) {

                        const deleted = await this.deleteOne(email);

                        const result = await DAOs.newsletter.addOneRegisted(email, user_id);

                        return result;

                  }

                  if (!checkSuscription.added) {

                        const result = await DAOs.newsletter.addOneRegisted(email, user_id);

                        return result;

                  }

            } catch (error) {

                  throw error;

            }

      }

      async unsuscribe(email) {

            try {

                  const checkSuscription = await this.checkSuscribedByEmail(email);

                  if (!checkSuscription.suscribed) {

                        throw {
                              statusCode: 400,
                              message: "Error al desuscribirse",
                              errors: ["El email ingresado no se encuentra suscripto"]
                        }

                  }

                  const result = await this.updateIsSuscribed(email, false);

                  return result;

            } catch (error) {

                  throw error;

            }

      }


}