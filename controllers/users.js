const express = require('express');
const router = express.Router();

const globals = require('../globals');
const mongoose = globals.mongoose;
const winston = globals.winston;

// models
const User = require('../models/user');

router.get('/', (req, res) => {
  // query the MongoDB database for all users
  User.find({})
  .exec()
  .then(users => {  // once we get the response
    res.send(users);
  })
  .catch(err => winston.error(err));
});

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

module.exports = router;
