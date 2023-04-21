let Joi = require("joi");

const validate = (schema, field = "body", options = {}) => (req, res, next) => {
	const { error, value } = schema.validate(req[field])

	if (!error) {
	    req[field] = value
	    return next()
	}

	res.badRequest(null, error.details[0].message)
};

module.exports = { Joi, validate }