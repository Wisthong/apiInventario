const { Router } = require("express");
const { createHost, getHosts, getHost } = require("../controllers/devices");
const { validatorDevice } = require("../validators/devices");
// const { checkAuth } = require("../middlewares/authSesion");
const router = Router();

router.post("/", [validatorDevice], createHost);

router.get("/", getHosts);

router.get("/:id", getHost);

// router.post("/login", [validatorLogin], login);

// router.get("/renew", [checkAuth], renewSesion);

module.exports = router;
