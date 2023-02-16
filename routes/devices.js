const { Router } = require("express");
const { createHost } = require("../controllers/devices");
const { validatorDevice } = require("../validators/devices");
// const { checkAuth } = require("../middlewares/authSesion");
const router = Router();

router.post("/", [validatorDevice], createHost);

// router.post("/login", [validatorLogin], login);

// router.get("/renew", [checkAuth], renewSesion);

module.exports = router;
