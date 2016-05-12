var path = require('path');
var mongoose = require('mongoose');



mongoose.connect('mongodb://localhost/shortly');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
  // we're connected!
  
  // db.createCollection('users');
  // db.createCollection('urls');

  // var urlsSchema = mongoose.Schema({
  //   id: ObjectId,
  //   url: String,
  //   baseUrl: String,
  //   code: String,
  //   title: String,
  //   visits: Number,
  //   timestamps: { createdAt: 'created_at' }
  // })
})



module.exports = db;
