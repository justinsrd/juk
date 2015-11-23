'use strict';

var express = require('express');
var app = express();
var mongo = require('mongodb');
var mongoURI = process.env.MONGOURI || 'mongodb://127.0.0.1/jukdb';
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');

app.use(express.static(__dirname + '/public'));

var userRoutes = express.Router();
require('./routes/router.js')(userRoutes);
app.use('/api', userRoutes);

mongoose.connect(mongoURI, function(err, db) {
  if (err) {
    console.log(err);
  } else {
    console.log('Successfully connected to database.....\n');
  }
});

app.listen(port, function() {
  console.log('\nServer is running on port ' + port + '.....\n');
});