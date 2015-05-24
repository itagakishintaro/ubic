var querystring = require('querystring');
var http = require('http');
// var ubic_data = require('./data.js');

var categoryId = 402;
var documentId = 1;
var teacherId = 1;
var relevant = [1,2,3,4];
var notRelevant = [1,2,3,4];

// var documentPostBody = '{"documentId":'+'1'+
//                        ', "categoryId":'+'401'+
//                        ',"text":"sample"}';
var documentPostBody = '{"documentId":1,"categoryId":402,"text":"テキストサンプル"}';
// var teachPostBody = '{"teacherId":'+teacherId+
//                     ',"documents":{"relevant":'+relevant+
//                     ',"notRelevant":'+notRelevant+
//                     ' },"categoryId":'+categoryId+'}';
// var leaningResultPostBody = '{"teacherId":'+teacherId+
//                     ',"documents":{"relevant":'+relevant+
//                     ',"notRelevant":'+notRelevant+
//                     ' },"categoryId":'+categoryId+'}';
// var deleteTeacherPostBody = '{"teacherIds":'+teacherId+
//                     ',"documents":{"relevant":'+relevant+
//                     ',"notRelevant":'+notRelevant+
//                     ' },"categoryId":'+categoryId+'}';

var documentPath = '/document_analyzer/api/document';
var teachPath = '/relevance_evaluator/api/teacher';
var leaningPath = '/relevance_evaluator/api/leaningResult';
var deleteTeacherPath = '/relevance_evaluator/api/deleteTeacher';

var options = {
  hostname: '180.42.27.182',
  port: 80,
  path: '/document_analyzer/api/document',
  method: 'POST',
  headers: {
    'Content-Type' : 'application/json'
  }
};

function document(urlInfo, postBody, callback) {
  var req = http.request(options, function(res) {
    options.path = documentPath;
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('ERROR' + e.message);
  });

  req.write(postBody);
  req.end();
}

function teacher(urlInfo, postBody, callback) {
  var req = http.request(options, function(res) {
    options.path = teachPath;
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.write(postBody);
  req.end();
}

function leaningResult(urlInfo, postBody, callback) {
  var req = http.request(options, function(res) {
    options.path = leaningResultPostBody;
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('ERROR' + e.message);
  });

  req.write(documentPostBody);
  req.end();
}

function deleteTeacher(urlInfo, postBody, callback) {
  var req = http.request(options, function(res) {
    options.path = deleteTeacherPath;
    console.log('STATUS: ' + res.statusCode);
    // console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      callback('BODY: ' + chunk);
    });
  });

  req.on('error', function(e) {
    console.log('ERROR' + e.message);
  });

  req.write(documentPostBody);
  req.end();
}

//sample
// var x1;
// var x2;
// teacher(x1, x2);

module.exports = {
    document: document,
    teacher: teacher,
    leaningResult: leaningResult,
    deleteTeacher: deleteTeacher
}
