const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorLogin = [
  check("email", "Debes ingresar email").exists().notEmpty().isEmail(),
  check("password", "Debes ingresar contraseña de minimo 8 caracteres")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 50 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorRegister = [
  check("name", "Debes ingresar el nombre").exists().notEmpty(),
  check("lastname", "Debes ingresar el apellido").exists().notEmpty(),
  check("role", "Debes ingresar el role").default("user"),
  check("email", "Debes ingresar email")
    .exists()
    .notEmpty()
    .isEmail()
    .toLowerCase(),
  check("password", "Debes ingresar contraseña de minimo 8 caracteres")
    .exists()
    .notEmpty()
    .isLength({ min: 5, max: 70 }),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorUserId = [
  check("id", "Debes ingresar un id valido").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorLogin, validatorRegister, validatorUserId };
