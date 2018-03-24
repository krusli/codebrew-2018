const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: {type: String, unique: true},
  firstName: String,
  lastName: String,
  email: {type: String, unique: true},
  timeCreated: {type: Date, default: Date.now},
  courses: [Schema.ObjectId]
});

module.exports = mongoose.model('User', userSchema)
