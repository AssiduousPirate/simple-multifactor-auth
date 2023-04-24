const express = require("express")
const router = express.Router()
const AuthController = require("./AuthController")
const { validate } = require("../../utils/validate")
const validation = require("./AuthValidation")
//const verifyOidc = require("../../utils/auth")

router.get(
    "/",
    AuthController.Home
)

router.post(
    "/login",
    validate(validation.Login),
    AuthController.Login
)

router.post(
    "/verify-mfa",
    validate(validation.VerifyMFA),

)

router.get(
    "/dashboard",
    //verifyOidc,
    AuthController.Dashboard
)

router.get(
    "/logout",
    AuthController.Logout
)

module.exports = router