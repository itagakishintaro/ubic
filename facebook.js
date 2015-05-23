'use strict';
// https://github.com/amachang/facebook-node-sdk
var Facebook = require('facebook-node-sdk');
var facebook = new Facebook({
  appId: process.env.FB_APP_ID,
  secret: process.env.FB_APP_SECRET
});

function search(urlInfo, callback) {
  var id = '/4';
  if( urlInfo.query.id ) {
    id = urlInfo.query.id
  }
  var parameters = {};
  if( urlInfo.query.fields ) {
    parameters.fields = urlInfo.query.fields
  }
  facebook.api(id, parameters, function(err, data) {
    console.log(err);
    callback(data);
  });
}

module.exports = {
    search: search
}