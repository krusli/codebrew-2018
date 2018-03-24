const mongoose = require('mongoose');
const winston = require('winston');
const multer = require('multer');

// const UPLOAD_PATH = 'uploads';
// const upload = multer({ dest: `${UPLOAD_PATH}/` }); // multer configuration
var upload = multer({ storage: multer.diskStorage({

    destination: function (req, file, cb) {
      cb(null, './uploads');
    },

    filename: function (req, file, cb) {
      var ext = require('path').extname(file.originalname);
      ext = ext.length>1 ? ext : "." + require('mime').extension(file.mimetype);
      require('crypto').pseudoRandomBytes(16, function (err, raw) {
        cb(null, (err ? undefined : raw.toString('hex') ) + ext);
      });
    }

})});


winston.level = 'debug';

/* connect to MongoDB */
mongoose.connect('mongodb://master:jtqbRpWvNpVv@ds123259.mlab.com:23259/codebrew-2018');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => winston.info('Connected to MongoDB'));

module.exports.winston = winston;
module.exports.mongoose = mongoose;
// module.exports.multer = multer;
module.exports.upload = upload;
