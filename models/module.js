const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moduleSchema = {
  title: String,
  description: String,
  until: Date,
  // TODO other parts
  // - required submissions
}

module.exports = mongoose.model('Module', moduleSchema)
