import {
      body,
      check,
      oneOf
} from "express-validator";

import {
      resultCheck,
      validateNotExtraFields,
      validateEmail,
      validateNotEmptyFields
} from "../validations.middleware.js";

const loginFields = ["email", "password"];

const registerFields = ["first_name", "last_name", "email", "password"];

const basicDataFields = ["first_name", "last_name"];

const addressFields = ["state", "location", "address", "phone", "name"];

export const validateLogin = [

      validateNotEmptyFields(loginFields),

      validateNotExtraFields(loginFields),

      validateEmail,

      body("password").isLength({
            min: 8
      }).withMessage("La contraseña debe tener al menos 8 caracteres"),

      resultCheck

]

export const validateUserToRegister = [

      validateNotExtraFields(registerFields),

      validateNotEmptyFields(registerFields),

      validateEmail,

      body("first_name").isLength({
            min: 2
      }).withMessage("El nombre debe tener al menos 2 caracteres"),

      body("last_name").isLength({
            min: 2
      }).withMessage("El apellido debe tener al menos 2 caracteres"),

      body("password").isLength({
            min: 8
      }).withMessage("La contraseña debe tener al menos 8 caracteres"),

      resultCheck

];

export const validateBasicData = [

      validateNotExtraFields(basicDataFields),

      body("first_name").optional({
            checkFalsy: true
      }).isLength({
            min: 2
      }).withMessage("El nombre debe tener al menos 2 caracteres"),

      body("last_name").optional({
            checkFalsy: true
      }).isLength({
            min: 2
      }).withMessage("El apellido debe tener al menos 2 caracteres"),

      resultCheck
]

export const validateAddressData = [

      validateNotExtraFields(addressFields),

      body("state").notEmpty().withMessage("El departamento es obligatorio").isLength({
            min: 4
      }).withMessage("El departamento debe tener al menos 4 caracteres"),

      body("location").notEmpty().withMessage("La localidad es obligatoria").isLength({
            min: 4
      }).withMessage("La localidad debe tener al menos 4 caracteres"),

      body("address").notEmpty().withMessage("La dirección es obligatoria").isLength({
            min: 4
      }).withMessage("La dirección debe tener al menos 4 caracteres"),

      body("phone").notEmpty().withMessage("El teléfono es obligatorio").isLength({
            min: 8
      }).withMessage("El teléfono debe tener al menos 8 caracteres"),

      body("name").notEmpty().withMessage("El nombre es obligatorio").isLength({
            min: 4
      }).withMessage("El nombre debe tener al menos 4 caracteres"),

      resultCheck
];