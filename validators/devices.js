const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

const validatorDevice = [
  check("device", "Debes ingresar el nombre del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 1 }),
  check("host", "Debes ingresar el host")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("so", "Debes ingresar el sistema operativo y su versión")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("ip", "Debes ingresar la IP").exists().notEmpty().isLength({ min: 5 }),
  check("antivirus", "Debes ingresar el antivirus")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("fecha_ingreso", "Debes ingresar la fecha de ingreso")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("fecha_baja", "Debes ingresar la fecha de salida")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("licencias", "Debes ingresar las licencias del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("ram", "Debes ingresar la cantidad de memoria RAM del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("descripcion", "Debes ingresar la descripción del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("procesador", "Debes ingresar el nombre del procesador del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 3 }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorDevice };
