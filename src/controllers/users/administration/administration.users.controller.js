import {
      AdministrationUserService as AdminService
} from "../../../services/users/administration/administration.users.services.js";

import {
      successResponse,
      errorResponse
} from "../../../utils/responses/responses.utils.js";

import {
      sendInactiveEmail
} from "../../../utils/mailing/mailing.utils.js";

const adminService = new AdminService();

export class AdministrationUsersController {

      constructor() {

            this.formattedSuccessRes = this.formattedSuccessRes.bind(this);

            this.formattedErrorRes = this.formattedErrorRes.bind(this);

      }

      formattedSuccessRes(res, statusCode, message, payload) {

            const response = successResponse(statusCode, message, payload);

            res.status(statusCode).json(response);

      }

      formattedErrorRes(res, statusCode, message, error) {

            const response = errorResponse(statusCode, message, error);

            res.status(statusCode).json(response);

      }

      async getAll(req, res, next) {

            try {

                  const response = await adminService.getAll();

                  this.formattedSuccessRes(res, 200, "Usuarios encontrados", response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async getOneById(req, res, next) {

            try {

                  const userId = req.params.id;

                  const response = await adminService.getById(userId);

                  this.formattedSuccessRes(res, 200, `Usuario con id ${userId}`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async getOneByEmail(req, res, next) {

            try {

                  const email = req.body.email;

                  const response = await adminService.getByEmail(email);

                  this.formattedSuccessRes(res, 200, `Usuario con email ${email}`, response);


            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

      async deleteInactives(req, res, next) {

            try {

                  const response = await adminService.deleteInactives();

                  sendInactiveEmail(response.emails)

                  this.formattedSuccessRes(res, 200, `${response.count} usuarios inactivos eliminados`, response);

            } catch (error) {

                  this.formattedErrorRes(res, 400, error.message, error.errors);

            }

      }

}