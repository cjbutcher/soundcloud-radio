var express = require('express');
var router = express.Router();

var SC = require('node-soundcloud');

var User = require('../models/user');

SC.init({
  id: 'redacted',
  secret: 'redacted',
  uri: 'http://127.0.0.1:3000/auth/soundcloud/callback'
});

function getData(query) {
	SC.get(query, function(err, tracks) {
	  if (err) {
	    console.log('There was an error');
	  } else {
	  	console.log(tracks[0].title);
	  }
	});
}

// function createUser() {
// 	var newUser = User({
// 	  username: 'chris',
// 	  password: 'password',
// 	});

// 	// save the user
// 	newUser.save(function(err) {
// 	  if (err) throw err;
// 	  console.log('User created!');
// 	});
// }


/* GET home page. */
//console.log("WHAT IS getAllUsers RETURNING? " + getAllUsers())
router.get('/', function(req, res, next) {
  User.find({}, function(err, users) {
  	if(err) throw err;
	  res.render('index', {
			title: 'Express',
			data: getData('/users/68318186/tracks'),
			users: users,
			message: 'hi'
  	});
  });
});

module.exports = router;
