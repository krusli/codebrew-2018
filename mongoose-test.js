const mongoose = require('mongoose');
const winston = require('winston');

// import models
const User = require('./models/user');
const Course = require('./models/course');
const Module = require('./models/module');

// debugging level
winston.level = 'debug';

mongoose.connect('mongodb://master:jtqbRpWvNpVv@ds123259.mlab.com:23259/codebrew-2018');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => winston.info('Connected to MongoDB'));

var testUser = new User({
  username: "krusli",
  firstName: "Kenneth",
  lastName: "Aloysius",
  email: "rusli.kenneth@gmail.com"
});

User.find({username: testUser.username})
.then(user => {
  if (user.length) {
    throw 'UserAlreadyExists';
  } else {
    return User.create(testUser);
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

// var kittySchema = mongoose.Schema({
//   name: String
// });
// var Kitten = mongoose.model('Kitten', kittySchema); // add to collection Kitten?
//
// var silence = new Kitten({ name: 'Silence' });
// silence.save((err, cat) => {
//     if (err) return console.error(err);
//     console.log('Saved silence');
// });
//
// // find all kittens
// Kitten.find(function (err, kittens) {
//     console.log('Finding kittens');
//     if (err) return console.error(err);
//     console.log(kittens);
//
//     db.close();
// })
//
//
