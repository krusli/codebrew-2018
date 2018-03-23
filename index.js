var express = require('express');   // imports express
var app = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
});

app.listen(3000, function() {   // TODO change this to port 80 before deployment
    console.log('Listening at port 3000.');
});
