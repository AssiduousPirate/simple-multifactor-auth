const { Joi } = require("../../utils/validate")

const Register = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string(),
    phone: Joi.number()
})

module.exports = {
    Register
}