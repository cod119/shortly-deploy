var express = require('express');
var partials = require('express-partials');
var url = require('url');
var util = require('./lib/utility');

var handler = require('./lib/request-handler');

var app = express();

app.configure(function() {
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(partials());
  app.use(express.bodyParser());
  app.use(express.static(__dirname + '/public'));
  app.use(express.cookieParser('shhhh, very secret'));
  app.use(express.session());
  app.use(function(req, res, next) {
    var redirectURL = {
      '/': true,
      '/create' : true,
      '/links' : true
    };
    var pathname = url.parse(req.url).pathname;
    if(!req.session.isLoggedIn && redirectURL[pathname]) {
      res.redirect('/login');
    }
    next();
  });
});

app.get('/', util.checkUser, handler.renderIndex);
app.get('/create', util.checkUser, handler.renderIndex);

app.get('/links', util.checkUser, handler.fetchLinks);
app.post('/links', handler.saveLink);

app.get('/login', handler.loginUserForm);
app.post('/login', handler.loginUser);
app.get('/logout', handler.logoutUser);

app.get('/signup', handler.signupUserForm);
app.post('/signup', handler.signupUser);

app.get('/*', handler.navToLink);

module.exports = app;
