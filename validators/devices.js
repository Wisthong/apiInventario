const { check } = require("express-validator");
const { validateResult } = require("../helpers/handleValidator");

//TODO: http://localhost:3001/api/devices

const validatorDevice = [
  check("providers", "Debes ingresar el proveedor del dispositivo").exists({
    checkNull: false,
  }),
  // .exists()
  // .notEmpty()
  // .isLength({ min: 2 }),
  check("co", "Debes ingresar el centro de operacion").exists().notEmpty(),
  check("area", "Debes ingresar el area / departamento").exists().notEmpty(),
  check("numserie", "Debes ingresar el numero de serie").exists({
    checkNull: false,
  }),
  // .exists()
  // .notEmpty()
  // .isLength({ min: 5 }),
  check("discoduro", "Debes ingresar el disco duro").exists({
    checkNull: false,
  }),
  check("device", "Debes ingresar el nombre del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 1 }),
  check("hostname", "Debes ingresar el hostname, al menos 4 caracteres")
    .exists()
    .notEmpty()
    .isLength({ min: 4 }),
  check("so", "Debes ingresar el sistema operativo y su versión").exists({
    checkNull: false,
  }),
  check("ip", "Debes ingresar la IP").exists().notEmpty().isLength({ min: 11 }),
  check("antivirus", "Debes ingresar el antivirus").exists({
    checkNull: false,
  }),
  check("fecha_ingreso", "Debes ingresar la fecha de ingreso")
    .exists()
    .notEmpty()
    .isLength({ min: 5 }),
  check("fecha_baja", "Debes ingresar la fecha de ingreso").exists({
    checkNull: false,
  }),
  check("estado", "Debes ingresar el estado del dispositivo")
    .exists()
    .notEmpty(),
  check("precio", "Debes ingresar el precio del dispositivo")
    .exists()
    .notEmpty()
    .isNumeric(),
  check("licencias", "Debes ingresar las licencias del dispositivo").exists({
    checkNull: false,
  }),
  check("ram", "Debes ingresar la cantidad de memoria RAM del dispositivo")
    .exists()
    .notEmpty()
    .isLength({ min: 1 }),
  // check("usuario", "Debes ingresar el id del Usuario")
  //   .exists()
  //   .notEmpty()
  // .isMongoId(),
  check("descripcion", "Debes ingresar la descripción del dispositivo").exists({
    checkNull: false,
  }),
  // .exists()
  // .notEmpty()
  // .isLength({ min: 5 }),
  check(
    "procesador",
    "Debes ingresar el nombre del procesador del dispositivo"
  ).exists({
    checkNull: false,
  }),

  (req, res, next) => {
    validateResult(req, res, next);
  },
];

const validatorGetDevice = [
  check("id", "Debes ingresar un id valido").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];

module.exports = { validatorDevice, validatorGetDevice };
