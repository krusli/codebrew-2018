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

module.exports = router;
