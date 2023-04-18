const { response, request } = require("express");
const { userModel } = require("../model");
const {
  handleHttpError,
  handleErrorResponse,
} = require("../helpers/handleError");
const { matchedData } = require("express-validator");
const { encryptPassword, comparePassword } = require("../helpers/handleBcrypt");
const { signToken } = require("../helpers/handleJwt");

const login = async (req = request, res = response) => {
  try {
    let { email, password } = matchedData(req);
    const verifyEmail = await userModel.findOne({ email });
    if (!verifyEmail) {
      return handleErrorResponse(res, "No existe el email en nuestra DB", 401);
    }

    const verifyPassword = await comparePassword(
      password,
      verifyEmail.password
    );

    if (!verifyPassword) {
      return handleErrorResponse(
        res,
        "Contraseña incorrecta, por favor intenta nuevamente",
        401
      );
    }

    const token = await signToken(verifyEmail);

    res.send({
      ok: true,
      token,
      message: "Inicio de sesión exitoso",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const register = async (req = request, res = response) => {
  try {
    const body = matchedData(req);

    let { email, password } = body;
    const verifyEmail = await userModel.findOne({ email });

    if (verifyEmail) {
      return handleErrorResponse(res, "El email ya existe en nuestra DB", 401);
    }

    password = await encryptPassword(password);
    const dataUser = { ...body, password };
    const data = await userModel.create(dataUser);
    const token = await signToken(data);

    res.send({
      ok: true,
      token,
      message: "Registro de usuario exitoso",
    });
  } catch (error) {
    console.log(error);
    handleHttpError(res, error);
  }
};

const getUsers = async (req = request, res = response) => {
  try {
    const data = await userModel.find({});
    // data.set("userAdmin", undefined, { strict: false });
    if (!data) {
      return handleErrorResponse(
        res,
        "No se pudo obtener la lista de users",
        401
      );
    }
    res.send({
      data,
      ok: true,
      message: "Has obtenido la lista de los users",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const getUser = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const data = await userModel.findOne({ _id: id });
    // console.log(data);
    // if (!data || data.length < 1) {
    //   return handleErrorResponse(
    //     res,
    //     "No existe este id en nuestro sistema ",
    //     401
    //   );
    // }

    res.send({
      data,
      ok: true,
      message: "Has obtenido el dispositivo",
    });
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, error);
  }
};

const renewSesion = async (req = request, res = response) => {
  try {
    const { user } = req;
    const token = await signToken(user);
    res.send({
      ok: true,
      token,
      message: "Renovacion de token exitoso",
    });
  } catch (error) {
    handleHttpError(res, error);
  }
};

const updateUser = async (req = request, res = response) => {
  try {
    let { id, ...body } = matchedData(req);
    const { user } = req;
    const token = await signToken(user);

    const verifyUserId = await userModel.findOne({ _id: id });
    if (!verifyUserId) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }

    const { email } = body;

    const verifyEmail = await userModel.findOne({
      email: { $eq: email },
      _id: { $ne: id },
    });

    if (verifyEmail) {
      return handleErrorResponse(
        res,
        "El email ya esta asignada a otro usuario",
        401
      );
    }

    const usuario = user._id;
    // console.log(usuario);
    // body = { ...body, usuario };
    // console.log(body);
    const data = await userModel.findByIdAndUpdate(id, body);

    res.send({
      token,
      ok: true,
      message: "Has actualizado el usuario",
    });
  } catch (error) {
    handleErrorResponse(res, error);
  }
};

const deleteUser = async (req = request, res = response) => {
  try {
    const { id } = matchedData(req);
    const { user } = req;

    const token = await signToken(user);
    const verifyHost = await userModel.findOne({ _id: id });
    if (!verifyHost) {
      return handleErrorResponse(
        res,
        "No existe este id en nuestro sistema ",
        401
      );
    }
    //TODO: DELETE para usar mongoosedelete
    const data = await userModel.delete({ _id: id });
    // const data = await deviceModel.deleteOne({ _id: id });

    res.send({
      token,
      ok: true,
      message: "Has elimanado el dispositivo",
    });
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, error);
  }
};

module.exports = {
  login,
  register,
  renewSesion,
  getUser,
  getUsers,
  updateUser,
  deleteUser,
};
