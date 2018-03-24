const express = require('express');   // imports express
const app = express();

const path = require('path');
const mongoose = require('mongoose');
const winston = require('winston');

winston.level = 'debug';

/* connect to MongoDB */
mongoose.connect('mongodb://master:jtqbRpWvNpVv@ds123259.mlab.com:23259/codebrew-2018');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => winston.info('Connected to MongoDB'));

/* routes */
app.get('/', function(req, res) {
  // res.send('Hello world!');
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

const User = require('./models/user');
app.get('/users', (req, res) => {
  // query the MongoDB database for all users
  User.find({})
  .exec()
  .then(users => {  // once we get the response
    res.send(users);
  })
  .catch(err => winston.error(err));
})

// static files
app.use(express.static(path.join(__dirname, 'static')));

// 404 handler
app.use((req, res, next) => res.status(404).send("Error 404: not found"));

// error handler
app.use(function errorHandler (err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
})

/* start the server */
let port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening at port ' + port));
