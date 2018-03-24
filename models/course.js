const mongoose = require('mongoose')
const Schema = mongoose.Schema

const courseSchema = {
  title: String,
  description: String,
  companyID: Schema.ObjectId,
  modules: [Schema.ObjectId],
  until: Date,
  maxStudents: {type: Number, default: 0}  // 0: no limit
}

module.exports = mongoose.model('Course', courseSchema)
