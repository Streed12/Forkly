var express = require('express');
var bodyParser = require('body-parser');
var items = require('../db');
var handler = require('./requestHandler.js');
var facebook = require('./facebook.js');
var passport = require('passport');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../react/dist'));

// for Home Component - from searchRecipes function
app.post('/searchRecipes', handler.searchRecipes);

// for AddRecipe Component - from handleSubmit function
app.post('/api/addRecipe', (req, res) => {
  console.log(req.body);
  res.send('');
});

// for Nav Component - from getUsername function
app.get('/username', handler.getUsername);


app.use(passport.initialize());
// app.use(passport.session());

// facebook passport
app.get('/auth/facebook',
  passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

app.listen(3000, function() {
  console.log('listening on port 3000!');
});