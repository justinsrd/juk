'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
  host: String,
  roomName: String,
  playlist: Array
});

module.exports = mongoose.model('Room', roomSchema);