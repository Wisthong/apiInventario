const { response, request } = require("express");
const { deviceModel } = require("../model");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { signToken } = require("../helpers/handleJwt");

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
    const { user } = req;
    const token = await signToken(user);
    const data = await deviceModel.find();
    res.send({
      data,
      ok: true,
      token,
      message: "Has obtenido la lista de los dispositivos",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getHost = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const { user } = req;

    const token = await signToken(user);
    const data = await deviceModel.findOne({ _id: id });
    if (!data) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }

    res.send({
      data,
      token,
      ok: true,
      message: "Has obtenido el dispositivo",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const deleteHost = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const { user } = req;

    // const verifyExist = await deviceModel.findById()

    const token = await signToken(user);

    const data = await deviceModel.deleteOne({ _id: id });

    res.send({
      data,
      token,
      ok: true,
      message: "Has eliminado el dispositivo",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = { createHost, getHosts, getHost, deleteHost };
