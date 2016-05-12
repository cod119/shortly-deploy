var db = require('../config');
var crypto = require('crypto');


var urlsSchema = mongoose.Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  timestamps: { createdAt: 'created_at' }
});

urlsSchema.method('initialize', function() {
  var shasum = crypto.createHash('sha1');
  shasum.update(this.url));
  this.code = shasum.digest('hex').slice(0, 5);
});

var Link = mongoose.model('url', usersSchema, 'urls');


// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
