const { response, request } = require("express");
const { deviceModel } = require("../model");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");

const createHost = async (req = request, res = response) => {
  try {
    const body = matchedData(req);
    let { ip, host } = body;

    const verifyIp = await deviceModel.findOne({ ip });
    const verifyHost = await deviceModel.findOne({ ip });
    // if (verifyIp) {
    //   return handleErrorResponse(
    //     res,
    //     "Ya existe un dispositivo con esa dirección IP, por favor cambiar la IP",
    //     401
    //   );
    // }
    if (verifyHost) {
      return handleErrorResponse(
        res,
        "Ya existe un dispositivo con el mismo Hostname, por favor cambiar el Hostname",
        401
      );
    }

    const data = await deviceModel.create(body);
    console.log(data);
    res.send({
      ok: true,
      message: "Registro de dispositivo exitoso",
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

module.exports = { createHost };
