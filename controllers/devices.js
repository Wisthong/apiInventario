const { response, request } = require("express");
const { deviceModel } = require("../model");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData, body } = require("express-validator");
const { find } = require("../model/nosql/devices");

const createHost = async (req = request, res = response) => {
  try {
    const body = matchedData(req);
    let { ip, hostname } = body;

    const verifyIp = await deviceModel.findOne({ ip });
    const verifyHost = await deviceModel.findOne({ hostname });
    if (verifyIp) {
      return handleErrorResponse(
        res,
        "Ya existe un dispositivo con esa dirección IP, por favor cambiar la IP",
        401
      );
    }
    if (verifyHost) {
      return handleErrorResponse(
        res,
        "Ya existe un dispositivo con el mismo Hostname, por favor cambiar el Hostname",
        401
      );
    }

    const data = await deviceModel.create(body);
    res.send({
      ok: true,
      message: "Registro de dispositivo exitoso",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const getHosts = async (req = request, res = response) => {
  try {
    const data = await deviceModel.find();
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de los dispositivos",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getHost = async (req = request, res = response) => {
  try {
    req = matchedData(req);
    const { id } = req;
    const data = await deviceModel.findOne({ id });

    res.send({
      data,
      ok: true,
      message: "Has obtenido el dispositivo",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = { createHost, getHosts, getHost };
