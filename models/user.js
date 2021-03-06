'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  username: String,
  password: String,
  rooms: Array
});

module.exports = mongoose.model('User', userSchema);