var express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const multer = require('multer');
var exphbs = require('express-handlebars');

// lib
var Models = require('./models');
var defaultController = require('./controllers/defaultController');
var quizController = require('./controllers/quizController');
var categoryController = require('./controllers/categoryController');
var passport = require('./config/passport');
var passController = require('./controllers/passController');
var apiController = require('./controllers/apiController');
var userController = require('./controllers/userController');
var adminController = require('./controllers/adminController');

// Create app
var app = express();
var PORT = process.env.PORT || 3000;
var server_host = process.env.YOUR_HOST || '0.0.0.0';

// Set up view w. Handlebars
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// Middleware
app.use(session({
  secret: 'app',
  cookie: { maxAge: 6 * 1000 * 1000 * 1000 * 1000 },
  resave: true,
  saveUninitialized: true,
}));
app.use(cookieParser());

// make session available;
app.use(function(req, res, next) {
  res.locals.request = req;
  if (req.session != null && req.session.user_id != null) {
    res.locals.user = req.session.username;
    // res.locals.user = req.session.username; // user id
    res.locals.logged_in = true;
  }
  next(null, req, res);
});

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(process.cwd(), '/public')));
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

// Routers
app.use('/', defaultController);
app.use('/quizzes', quizController);
app.use('/categories', categoryController);
app.use('/auth', passController);
app.use('/api', apiController);
app.use('/user', userController);
app.use('/admin', adminController);


// Create Server
Models.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, server_host, function() {
    console.log(`Listening on PORT: ${PORT}`);
  });
});