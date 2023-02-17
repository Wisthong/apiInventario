const { Router } = require("express");
const {
  createHost,
  getHosts,
  getHost,
  deleteHost,
} = require("../controllers/devices");
const {
  validatorDevice,
  validatorGetDevice,
} = require("../validators/devices");
const { checkAuth } = require("../middlewares/authSesion");
const router = Router();

router.post("/", [checkAuth, validatorDevice], createHost);

router.put("/", [checkAuth, validatorDevice], createHost);

router.get("/", [checkAuth], getHosts);

router.get("/:id", [checkAuth, validatorGetDevice], getHost);

router.delete("/:id", [checkAuth, validatorGetDevice], deleteHost);

// router.post("/login", [validatorLogin], login);

// router.get("/renew", [checkAuth], renewSesion);

module.exports = router;
