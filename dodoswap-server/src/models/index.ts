import mongoose from 'mongoose'
import Item from './item'

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/dodo-swap', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
console.log("CONNECTED!")

module.exports.User = require('./user')
module.exports.Item = Item


module.exports.Event = require('./event')
module.exports.Rating = require('./rating')


