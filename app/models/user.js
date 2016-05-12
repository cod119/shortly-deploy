var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');


var usersSchema = mongoose.Schema({
    // id: ObjectId,
    username: String,
    password: String
    //timestamps: { createdAt: 'created_at' }
  });

usersSchema.method('hashPassword', function() {
  //var cipher = Promise.promisify(bcrypt.hash);
  var self = this;
  console.log('this is, ',self);
  return new Promise(function(resolve, reject) {
    bcrypt.hash(self.password, bcrypt.genSaltSync(), null, function(err, hash) {
      if (err) reject(err);
      console.log('hash is ', hash);
      resolve(hash);
    });
  }).then(function(hash) {
      self.password = hash;
      //return self;
  });
});

usersSchema.method('comparePassword', function(attemptedPassword, callback) {
  console.log('this.password ', this.password);
  bcrypt.compare(attemptedPassword, this.password, function(err, isMatch) {
      callback(isMatch);
  });
});

var User = db.model('user', usersSchema, 'users');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

module.exports = User;
