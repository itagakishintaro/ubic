var request = require('request');
var http = require('http');

var options = {
    host: '180.42.27.182',
    // host:'http://www.abw.co.jp',
    port: '80',
    path: 'document_analyzer/api/document',
    method: 'POST',
    headers: {
      "documentId":1,
      "categoryId":1,
      "text":"テキストサンプル"
    }
};

// var body = '{"documentId":1, "categoryId":1,"text":"テキストサンプル"}';

// Set up the request

console.log('request');
var post_req = http.request(options, function(res) {
    console.log('request in func'); 
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
        console.log('Response: ' + chunk);
    });
});

// request.post(options, function(error, response, body){
//   console.log('error ' + error);
//   if (!error && response.statusCode == 200) {
//     console.log(body);
//   } else {
//     console.log('error: '+ response.statusCode);
//   }
// });
