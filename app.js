let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
const session = require('express-session')
const oidc = require("./utils/auth")

let app = express()

app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
}))

app.use(oidc.router)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// app.use(function(req, res, next) {
//     next(createError(404))
// })

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})

app.use("/", require("./routes"))


module.exports = app
