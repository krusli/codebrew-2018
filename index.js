var express = require('express');   // imports express
var app = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
});

if (process.env.ENV = 'PRODUCTION') {
    let port = process.env.PORT || 3000;
    app.listen(port, () => console.log('Listening at port 80.'));
}
else {
    app.listen(3000, function() {   // same as () => {} (arrow function)
        console.log('Listening at port 3000.');
    });
}
