import {
      body,
      validationResult
} from "express-validator";

import {
      validateUserToRegister
} from "./users/users.validations.middleware.js";

import ValidationError from "../../services/errors/validationError.js";

export const resultCheck = (req, res, next) => {

      const errors = validationResult(req);

      if (!errors.isEmpty()) {

            return next(new ValidationError(errors.array().map(err => err.msg)));

      }

      next();

};

export const validateNotEmptyFields = (fields) => {

      const validations = fields.map(
            field => body(field)
            .notEmpty()
            .withMessage(`El campo ${field} no puede estar vacío`)
      );

      return [...validations, resultCheck];

};

export const validateEmail = [

      body("email").isEmail().normalizeEmail().withMessage("El email no es válido"),

      resultCheck

];