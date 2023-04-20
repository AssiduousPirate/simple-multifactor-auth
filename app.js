let createError = require('http-errors')
let express = require('express')
let path = require('path')
let cookieParser = require('cookie-parser')
let logger = require('morgan')
const session = require('express-session')
const { ExpressOIDC } = require('@okta/oidc-middleware')

let indexRouter = require('./routes/index')
let usersRouter = require('./routes/users')
let dashboardRouter = require('./routes/dashboard')

let app = express()

app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: false,
}))

const oidc = new ExpressOIDC({
    issuer: `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`,
    client_id: process.env.OKTA_OAUTH2_CLIENT_ID,
    client_secret: process.env.OKTA_OAUTH2_CLIENT_SECRET,
    appBaseUrl: `${process.env.HOST_URL}`,
    scope: 'openid profile',
})
app.use(oidc.router)

app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.use('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)

app.use(function(req, res, next) {
    next(createError(404))
})

app.use(function(err, req, res, next) {
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.render('error')
})
module.exports = app
