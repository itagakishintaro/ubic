var querystring = require('querystring');
// var postData = querystring.stringify({
//   'documentId' : '1',
//   'categoryId' : '402',
//   'text' : 'text sample'
// });

// var postData = QueryString.stringify({ foo: 'bar', baz: ['qux', 'quux'], corge: '' })
//
// var postData = queryString.stringify({
//   'msg' : 'Hello World!'
// });

var http = require('http');

var postData = '{"documentId":1, "categoryId":402,"text":"sample"}';

var options = {
  hostname: '180.42.27.182',
  port: 80,
  path: '/document_analyzer/api/document',
  method: 'POST',
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Type' : 'application/json; charset=utf-8',
    'Content-Length': postData.length
  }
};

var req = http.request(options, function(res) {
  console.log('STATUS: ' + res.statusCode);
  console.log('HEADERS: ' + JSON.stringify(res.headers));
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    console.log('BODY: ' + chunk);
  });
});

req.on('error', function(e) {
  console.log('problem with request: ' + e.message);
});

// write data to request body
req.write(postData);
req.end();
