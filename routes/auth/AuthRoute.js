const express = require("express")
const router = express.Router()
const AuthController = require("./AuthController")
const { validate } = require("../../utils/validate")
const validation = require("./AuthValidation")
const oidc = require("../../utils/auth")

router.get(
    "/",
    AuthController.Home
)

router.post(
    "/register",
    validate(validation.Register),
    AuthController.Register
)

router.get(
    "/dashboard",
    oidc.ensureAuthenticated(),
    AuthController.Dashboard
)

router.post(
    "/logout",
    AuthController.Logout
)

module.exports = router