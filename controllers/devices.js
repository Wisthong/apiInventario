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
    const { user } = req;
    let { ip, hostname } = body;

    const token = await signToken(user);
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
      token,
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
    if (!data) {
      return handleErrorResponse(
        res,
        "No se pudo obtener la lista de dispositivos",
        401
      );
    }
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
    const { id } = matchedData(req);

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

    const token = await signToken(user);
    const verifyHost = await deviceModel.findOne({ _id: id });
    if (!verifyHost) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }
    //TODO: DELETE para usar mongoosedelete
    const data = await deviceModel.delete({ _id: id });
    // const data = await deviceModel.deleteOne({ _id: id });

    res.send({
      token,
      ok: true,
      message: "Has elimanado el dispositivo",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const updateHost = async (req = request, res = response) => {
  try {
    const { id, ...body } = matchedData(req);
    const { user } = req;
    const token = await signToken(user);

    const verifyHost = await deviceModel.findOne({ _id: id });
    if (!verifyHost) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }

    const { hostname, ip } = body;

    const verifyIp = await deviceModel.findOne({
      ip: { $eq: ip },
      _id: { $ne: id },
    });
    // const verifyIp = await deviceModel.findOne({ ip });
    if (verifyIp) {
      return handleErrorResponse(
        res,
        "La IP ya esta asignada a otro dispositivo",
        401
      );
    }

    const verifyHostName = await deviceModel.findOne({
      hostname: { $eq: hostname },
      _id: { $ne: id },
    });
    // const verifyHostName = await deviceModel.findOne({ hostname });
    if (verifyHostName) {
      return handleErrorResponse(
        res,
        "La Hostname ya esta asignada a otro dispositivo",
        401
      );
    }

    const data = await deviceModel.findByIdAndUpdate(id, body);

    res.send({
      token,
      ok: true,
      message: "Has actualizado el dispositivo",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

module.exports = { createHost, getHosts, getHost, deleteHost, updateHost };
