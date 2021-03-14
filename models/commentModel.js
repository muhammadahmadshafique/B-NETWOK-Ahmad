const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({}, { timeStamps: true })

module.exports = mongoose.model('comment', commentSchema)
