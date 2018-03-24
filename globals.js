const mongoose = require('mongoose');
const winston = require('winston');

winston.level = 'debug';

/* connect to MongoDB */
mongoose.connect('mongodb://master:jtqbRpWvNpVv@ds123259.mlab.com:23259/codebrew-2018');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => winston.info('Connected to MongoDB'));

module.exports.winston = winston;
module.exports.mongoose = mongoose;
