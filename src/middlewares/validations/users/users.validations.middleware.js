import {
      body,
      check,
      oneOf
} from "express-validator";

import {
      resultCheck,
      validateEmail,
      validateNotEmptyFields
} from "../validations.middleware.js";

export const validateUserToRegister = [

      validateNotEmptyFields(['first_name', 'last_name', 'email', 'password', 'age', 'phone']),

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

      body("age").isInt({
            min: 18
      }).withMessage("La edad debe ser un número entero mayor a 18"),

      body("phone").isLength({
            min: 5
      }).withMessage("El teléfono debe tener al menos 5 caracteres"),

      resultCheck

];

export const validateBasicData = [

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

      body("age").optional({
            checkFalsy: true
      }).isInt({
            min: 18
      }).withMessage("La edad debe ser un número entero mayor a 18"),

      body("phone").optional({
            checkFalsy: true
      }).isLength({
            min: 5
      }).withMessage("El teléfono debe tener al menos 5 caracteres"),

      resultCheck
]

export const validateAddressData = [

      body("street").notEmpty().withMessage("La calle es obligatoria").isLength({
            min: 4
      }).withMessage("La calle debe tener al menos 4 caracteres"),

      body("number").optional(),

      body("city").notEmpty().withMessage("La ciudad es obligatoria").isLength({
            min: 4
      }).withMessage("La ciudad debe tener al menos 4 caracteres"),

      body("state").notEmpty().withMessage("El departamento es obligatorio").isLength({
            min: 4
      }).withMessage("El departamento debe tener al menos 4 caracteres"),

      body("location").notEmpty().withMessage("La localidad es obligatoria").isLength({
            min: 4
      }).withMessage("La localidad debe tener al menos 4 caracteres"),

      body("zip").notEmpty().withMessage("El código postal es obligatorio").isLength({
            min: 4
      }).withMessage("El código postal debe tener al menos 4 caracteres"),

      resultCheck
];