// node dependencies
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var router = express.Router();
var github = require('passport-github2')

// custom dependencies
var db = require('../db/db');
var listingsCtrl = require('./controllers/listings-controller.js');
var categoriesController = require('./controllers/categoriesController');
var usersController = require('./controllers/usersController');

// create server instance
var app = express();

var listings = [
  {
    createdAt: '26 Jan 2016',
    title: 'House to let in apartment not centrally located',
    description: 'I like cheese',
    location: 'Pacific Heights',
    price: '$2,500pm'
  },
  {
    createdAt: '30 May 2016',
    title: 'Crappy room in Russian Hill',
    description: 'It\'s the worst.',
    location: 'Russian Hill',
    price: '$1,400'
  }
];
var counter = 0;

//------------------------------------------
// // use middleware
app.use(session({
  secret: 'hackyhackifiers',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
// configure passport
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
});

// parse application/json

app.use(bodyParser.json());
app.use(morgan('dev'));

// serve static files / libraries to the client
app.use (express.static('./client'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react-bootstrap/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/bootstrap/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/jquery/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react/dist/'));
app.use ('/scripts', express.static(__dirname + '/../node_modules/react-dom/dist/'));

//-----------------------------------------
//Configure Passport Github oAuth strategy
passport.use(new github({
  clientID: '769b6aadfc9c8cca0bcc',
  clientSecret: 'd53b387b9f4a8987ddc81a337899bcfa31e0b0d7',
  callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
},
  function(accessToken, refreshToken, profile, done) {
    db.User.findOrCreate({where: {username: profile.username}})
           .spread(function(user, created) {
             return done(null, user);
           });
  }
));

app.get('/api/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }));

// routing: handle endpoint requests from client
app.route('/api/listings')
  .get(function(req, res) {
    listingsCtrl.getAll(req.query.category, function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  })
  .post(function(req, res) {
    listingsCtrl.addOne(req.body, function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  });

app.route('/api/categories')
  .get(function(req, res) {
    categoriesController.getAll(function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  });
app.route('/api/users')
  .get(function(req, res) {
    usersController.getAll(function(statusCode, results) {
      res.status(statusCode).send(results);
    });
  });

// Start server, listen for client requests on designated port
console.log( 'hackifieds server listening on 3000....' );


// app.get('/login', function(req, res, next) {
//     res.redirect('/');
  
//   });

// app.get('/logout', function(req, res){
//   req.logout();
//  // res.redirect('/')
//   return res.status(200).end();
// });

// Set what we are listening on.
app.listen(3000);

module.exports.app = app;

