import {
      successResponse,
      errorResponse
} from "../../../utils/responses/responses.utils.js";

import {
      NewsletterService
} from "../../../services/users/newsletter/newsletter.users.services.js";

const newsletterService = new NewsletterService();

export class NewsletterController {

      constructor() {

            this.formattedSuccessRes = this.formattedSuccessRes.bind(this);

            this.formattedErrorRes = this.formattedErrorRes.bind(this);

      }

      formattedSuccessRes(res, statusCode, message, payload) {

            const response = successResponse(statusCode, message, payload);

            res.status(statusCode).json(response);

      }

      formattedErrorRes(res, statusCode, message, error) {

            const response = errorResponse(statusCode ? statusCode : 500, message, error);

            res.status(statusCode ? statusCode : 500).json(response);

      }

      async getAll(req, res, next) {

            try {

                  const result = await newsletterService.getAll();

                  this.formattedSuccessRes(res, 200, `Lista de usuarios ingresados`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

      async getAllSuscribedEmails(req, res, next) {

            try {

                  const result = await newsletterService.getAllSuscribedEmails();

                  this.formattedSuccessRes(res, 200, `Lista de suscriptores activos`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

      async sendEmail(req, res, next) {

            try {

                  const {
                        title,
                        subtitle,
                        section,
                        img,
                        imgDescription,
                        siteURL
                  } = req.body;

                  const result = await newsletterService.sendEmail(title, subtitle, section, img, imgDescription, siteURL);

                  this.formattedSuccessRes(res, 200, `Email enviado correctamente`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

      async suscribeNoRegisted(req, res, next) {

            try {

                  const userEmail = req.body.email

                  const result = await newsletterService.suscribeNoRegisted(userEmail);

                  this.formattedSuccessRes(res, 200, `Correo suscrito correctamente`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

      async suscribeRegisted(req, res, next) {

            try {

                  const userEmail = req.user.email;

                  const user_id = req.user._id;

                  req.user = null;

                  const result = await newsletterService.suscribeRegisted(userEmail, user_id);

                  this.formattedSuccessRes(res, 200, `Usuario suscrito correctamente`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

      async unsuscribe(req, res, next) {

            try {

                  const userEmail = req.user.email;

                  req.user = null;

                  const result = await newsletterService.unsuscribe(userEmail);

                  this.formattedSuccessRes(res, 200, `Usuario desuscrito correctamente`, result);

            } catch (error) {

                  this.formattedErrorRes(res, error.statusCode, error.message, error.errors);

            }

      }

}