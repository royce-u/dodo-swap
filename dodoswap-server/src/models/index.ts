import mongoose from 'mongoose'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dodo-swap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

module.exports.User = require('./user')
module.exports.Item = require('./item')
module.exports.Event = require('./event')
module.exports.Rating = require('./rating')


