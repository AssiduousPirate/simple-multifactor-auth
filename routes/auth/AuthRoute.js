const express = require("express")
const router = express.Router()
const AuthController = require("./AuthController")
const { validate } = require("../../utils/validate")
const validation = require("./AuthValidation")
const oidc = require("../../app")

router.get(
    "/",
    AuthController.Home
)

router.get(
    "/add-user",
    AuthController.AddUser
)

router.post(
    "/register",
    validate(validation.Register),
    AuthController.Register
)

router.post(
    "/verify-mfa",
    validate(validation.VerifyMFA),

)

router.get(
    "/dashboard",
    oidc.ensureAuthenticated(),
    AuthController.Dashboard
)

router.get(
    "/profile",
    oidc.ensureAuthenticated(),
    AuthController.Edituser
)

router.post(
    "/edit/password/:id",
    validate(validation.Editpassword, "params"),
    AuthController.Editpassword
)

router.get(
    "/logout",
    AuthController.Logout
)

module.exports = router