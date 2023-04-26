const { Joi } = require("../../utils/validate")

const Register = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).max(16).pattern(new RegExp("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^\w\\d\\s:])([^\\s])*$")).required()
})

const VerifyMFA = Joi.object().keys({
    OTP: Joi.number().required()
})

module.exports = {
    Register,
    VerifyMFA
}