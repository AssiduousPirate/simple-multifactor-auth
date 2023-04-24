const HttpResponseCode = {
    OK: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    NOT_ACCEPTABLE: 406
};

const Response = {
    success(data = {}, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.OK,
            status: true,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    badRequest(data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.BAD_REQUEST,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    customBadRequest(status, data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: status,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    customBadRequestWithNoData(message = "", data = null) {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.BAD_REQUEST,
            status: data ? true : false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    unauthorized(data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.UNAUTHORIZED,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    forbidden(data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.FORBIDDEN,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    notFound(data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.NOT_FOUND,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    serverError(data = null, message = "", /** @type Error */ err = null) {
        if (err) console.error(err);
        this.status(HttpResponseCode.Ok).send({
            statusCode: HttpResponseCode.SERVER_ERROR,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
    notAcceptable(data = null, message = "") {
        this.status(HttpResponseCode.OK).send({
            statusCode: HttpResponseCode.NOT_ACCEPTABLE,
            status: false,
            data: typeof data === "string" ? null : data,
            message,
        });
    },
};

module.exports.HttpResponseCode = HttpResponseCode;
module.exports.Response = Response;