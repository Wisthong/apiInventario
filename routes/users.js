const { Router } = require("express");
const {
  register,
  login,
  renewSesion,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const {
  validatorLogin,
  validatorRegister,
  validatorUserId,
} = require("../validators/auth");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const { validatorGetDevice } = require("../validators/devices");
const router = Router();

// router.post("/register", register);
router.post("/register", [validatorRegister], register);

router.post("/login", [validatorLogin], login);

router.get("/", getUsers);

router.get("/obtener/:id", [validatorUserId], getUser);

router.get("/renew", [checkAuth], renewSesion);

router.put("/:id", [checkAuth, validatorRegister, validatorUserId], updateUser);

router.delete(
  "/delete/:id",
  [checkAuth, checkRol(["master"]), validatorGetDevice],
  deleteUser
);


module.exports = router;
