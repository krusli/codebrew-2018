const express = require('express');
const router = express.Router();

const globals = require('../globals');
const mongoose = globals.mongoose;
const winston = globals.winston;

// models
const User = require('../models/user');

// router.get('/', (req, res) => {
//   // query the MongoDB database for all users
//   User.find({})
//   .exec()
//   .then(users => {  // once we get the response
//     res.send(users);
//   })
//   .catch(err => winston.error(err));
// });

router.post('/', (req, res) => {
  User.find({username: req.body.username})
  .then(user => {
    if (user.length) {
      throw 'UserAlreadyExists';
    } else {
      return User.create(req.body);
    }
  })
  .then(user => {
    winston.debug(user);
    winston.debug('User created successfully!');
  })
  .catch(err => {
    if (err.toString() == 'UserAlreadyExists')
      winston.debug('UserAlreadyExists');
    else
      winston.debug(err);
  })

  res.send(req.body);
})

router.get('/login', (req, res) => {
  // get vars from query
  console.log(req.query);
  let email = req.query.email;

  // TODO password validation; use middleware
  if (email) {
    User.findOne({email: email})
    .then(user => {
      if (user) {
        console.log(user);
        res.send(user.id);
      } else {
        throw 'UserNotFound'
      }
    })
    .catch(err => {
      if (err.toString() == 'UserNotFound') {
        winston.debug('UserNotFound');
        res.send();
      }
      else
        winston.debug(err);
    })
  } else {
    res.send();
  }
})

router.post('/profile', (req, res) => {
  let bio = req.body.bio;
  let bioLong = req.body.bioLong;
  let id = req.body.id;

  winston.debug(id);
  if (id) {
    User.findOne({_id: id})
    .then(user => {
      if (user) {
        console.log(user);

        if (bio)
          user.bio = bio;
        if (bioLong)
          user.bioLong = bioLong;

        return user.save();
      } else {
        throw 'UserNotFound'
      }
    })
    .then(user => {
      winston.debug('Saved user.');
      res.send(user);
    })
    .catch(err => {
      if (err.toString() == 'UserNotFound') {
        winston.debug('UserNotFound');
        res.send();
      }
      else
        winston.debug(err);
    })
  }

  else {
    res.send();
  }
});


module.exports = router;
