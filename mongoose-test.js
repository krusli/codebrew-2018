const mongoose = require('mongoose');
mongoose.connect('mongodb://master:jtqbRpWvNpVv@ds123259.mlab.com:23259/codebrew-2018');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    // we're connected!
    console.log('Connected to MongoDB');
});

var kittySchema = mongoose.Schema({
  name: String
});
var Kitten = mongoose.model('Kitten', kittySchema); // add to collection Kitten?

var silence = new Kitten({ name: 'Silence' });
silence.save((err, cat) => {
    if (err) return console.error(err);
    console.log('Saved silence');
});

// find all kittens
Kitten.find(function (err, kittens) {
    console.log('Finding kittens');
    if (err) return console.error(err);
    console.log(kittens);

    db.close();
})


