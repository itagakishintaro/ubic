var querystring = require('querystring');

var http = require('http');

var categoryId = 402;
var documentId = 1;
var teacherId = 1;
var relevant = [1,2,3,4];
var notRelevant = [1,2,3,4];

var documentPostBody = '{"documentId":'+documentId+', "categoryId":'+categoryId+',"text":"sample"}';
var teachPostBody = '{"teacherId":'+teacherId+
                    ',"documents":{"relevant":'+relevant+',"notRelevant":'+notRelevant+' },"categoryId":'+categoryId+'}';
var leaningResultPostBody = '{"documentId":2, "categoryId":402,"text":"sample"}';
var deleteTeacherPostBody = '{"documentId":2, "categoryId":402,"text":"sample"}';

var documentPath = '/document_analyzer/api/document';
var teachPath = '/relevance_evaluator/api/teacher';
var leaningPath = '/relevance_evaluator/api/leaningResult';
var deleteTeacher = '/relevance_evaluator/api/deleteTeacher';

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
    options.path = documentPath;
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
  req.write(documentPostBody);
  req.end();
}

function teacher(urlInfo, callback) {
  var req = http.request(options, function(res) {
    options.path = teachPostBody;
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
  req.write(teachPostBody);
  req.end();
}

function leaningResult(urlInfo, callback) {
  var req = http.request(options, function(res) {
    options.path = leaningResultPostBody;
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
  req.write(teachPostBody);
  req.end();
}

var x1;
var x2;
teacher(x1, x2);

module.exports = {
    document: document,
    teacher: teacher
}
