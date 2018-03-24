const express = require('express');   // imports express
const app = express();

const path = require('path');
// const mongoose = require('mongoose');
// const winston = require('winston');

const globals = require('./globals');
const mongoose = globals.mongoose;
const winston = globals.winston;

/* routes */
app.get('/', function(req, res) {
  // res.send('Hello world!');
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.use('/users', require('./controllers/users'));

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
