const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = {
  title: String,
  description: String,
  // author: Schema.ObjectId,
  author: String,
  contributors: [Schema.ObjectId],
  until: Date,
  current: {type: Number, default: 0},
  goal: Number,
  background: Number,
  profilePhoto: Number
}

module.exports = mongoose.model('Project', projectSchema)
