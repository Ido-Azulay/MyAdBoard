const express = require('express');
const path = require('path');
const createError = require('http-errors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');


// Import route modules
var indexRouter = require('./routes/index');
var apiRouter = require('./routes/api');
var postAddRouter = require('./routes/postAd');
var confirmRouter = require('./routes/confirm');
var loginRouter = require('./routes/login');
var adminRouter = require('./routes/adminDashboard');
var actionsRouter = require('./routes/adminActions');
var logoutRouter = require('./routes/logout');



var app = express();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// Configure session middleware
app.use(session({
  secret: 'beXVdgIS4q',
  resave: false,
  saveUninitialized: true,
  //cookie: {secure:true}
}));

// Define routes for various endpoints
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/postAd', postAddRouter);
app.use('/confirm', confirmRouter);
app.use('/login', loginRouter);
app.use('/adminDashboard', adminRouter);
app.use('/adminActions', actionsRouter);
app.use('/logout', logoutRouter);

const db = require('./models/index');


//-------------------------------------------------------------------------
// Sync the database and create or find admin users and ad
db.sequelize
    .sync()
    .then(async () => {
      console.log("Database Synced");

      // Create or find admin users
      await db.Admin.findOrCreate({
        where: { name: "admin" },
        defaults: { password: "admin" },
      });

        await db.Admin.findOrCreate({
            where: { name: "admin2" },
            defaults: { password: "admin2" },
        });

      console.log("Admin users created or found");

      // Check if an ad with the specified title exists
      const existingAd = await db.Ad.findOne({
        where: { title: 'Some Title' },
      });

      if (!existingAd) {
        // If the ad doesn't exist, create it
        await db.Ad.create({
          title: 'Some Title',
          description: 'Some Ad Description',
          price: 50.00,
          phone: '0545454545',
          email: 'example@example.com',
          isApproved: true,
        })
            .then((ad) => {
              console.log('Ad created');
            })
            .catch((err) => {
              console.log('Error creating ad:', err);
            });
      } else {
        console.log('Ad with title "Your Ad Title" already exists.');
      }

      console.log("Database sync, admin creation/find, and ad creation/find complete");
    })
    .catch((err) => {
      console.log("Error syncing database, creating/find admin users, or creating/find ad");
      console.log(err);
    });

//---------------------------------------------------------------------

// catch 404 and forward to error handler
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
