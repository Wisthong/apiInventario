const { Router } = require("express");
const {
  createHost,
  getHosts,
  getHost,
  deleteHost,
  updateHost,
} = require("../controllers/devices");
const {
  validatorDevice,
  validatorGetDevice,
} = require("../validators/devices");
const { checkAuth } = require("../middlewares/authSesion");
const { checkRol } = require("../middlewares/rol");
const router = Router();

router.post("/", [checkAuth, checkRol(["admin"]), validatorDevice], createHost);

router.get("/", getHosts);

router.get("/:id", [validatorGetDevice], getHost);

router.delete(
  "/:id",
  [checkAuth, checkRol(["admin"]), validatorGetDevice],
  deleteHost
);

router.put(
  "/:id",
  [checkAuth, checkRol(["admin"]), validatorDevice, validatorGetDevice],
  updateHost
);

module.exports = router;
