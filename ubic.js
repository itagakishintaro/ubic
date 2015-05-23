var querystring = require('querystring');
var http = require('http');

var options = {
  hostname: '180.42.27.182',
  port: 80,
  path: '/document_analyzer/api/document',
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json; charset=utf-8'
  }
};

function document(urlInfo, callback) {
  var req = http.request(options, function(res) {
    console.log('STATUS: ' + res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  // write data to request body
  var id = 0;
  if( urlInfo.query.id ) {
    id = urlInfo.query.id
  }
  req.write(postData[Number(id)]);
  req.end();
}

module.exports = {
    document: document
}