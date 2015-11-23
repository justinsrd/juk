'use strict';

var bodyParser = require('body-parser');
var User = require('../models/user');
var Room = require('../models/room');


module.exports = function(router) {
  router.use(bodyParser.urlencoded({extended: false}));
  router.use(bodyParser.json());

  // POST a new user to database
  router.post('/register', function(req, res) {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password,
      rooms: []
    });
    newUser.save(function(err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send('Success! We made Ando.');
      }
    });
  });

  // POST a new room to a user
  router.post('/rooms', function(req, res) {
    var newRoomID;
    var newRoom = new Room({
      playlist: [],
      roomName: req.body.roomName,
      host: req.body.hostName
    });

    // Add new room to the collection 'rooms'
    newRoom.save(function(err, data) {
      if (err) {
        console.log(err);
      }
      newRoomID = data._id;
    });

    // Add the pointer to that room to its user
    User.findOne({username: req.body.hostName}, function(err, doc) {
      if (err) {
        console.log(err);
      } else {
        doc.rooms.push(newRoomID);
        User.update({username: req.body.hostName}, doc, function(err) {
          if (err) {
            console.log(err);
          } else {
            res.send('New room successfully created.');
          }
        });
      }
    });
  });

  // DELETE a room

  // PUT (Update) a room

  // GET a room

}