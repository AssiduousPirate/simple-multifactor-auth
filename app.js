var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// This code should come after the following line:
// var app = express()

const session = require('express-session')
app.use(session({
  secret: process.env.APP_SECRET,
  resave: true,
  saveUninitialized: false,
}))

const { ExpressOIDC } = require('@okta/oidc-middleware')
const oidc = new ExpressOIDC({
  issuer: `https://${process.env.OKTA_OAUTH2_ISSUER}/oauth2/default`,
  client_id: process.env.OKTA_OAUTH2_CLIENT_ID,
  client_secret: process.env.OKTA_OAUTH2_CLIENT_SECRET,
  appBaseUrl: `${process.env.HOST_URL}`,
  scope: 'openid profile',
})
app.use(oidc.router)

const dashboardRouter = require('./routes/dashboard')
app.use('/dashboard', oidc.ensureAuthenticated(), dashboardRouter)
app.use('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
