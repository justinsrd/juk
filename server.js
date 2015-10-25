'use strict';

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/'));

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('\nServer is running on port ' + port + '.....\n');
});