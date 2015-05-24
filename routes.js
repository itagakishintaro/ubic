'use strict';
var configRoutes;
var url = require('url');
var qs = require('querystring');
var twitter = require('./twitter');
var facebook = require('./facebook');
// var fql = require('./fql');
var ubic = require('./ubic');
var urlInfo;
var bodyParser = require('body-parser');

console.log("routes.js wake up");

configRoutes = function(app, server) {
    app.get('/', function(request, response) {
        response.redirect('/index.html');
    });

    app.all('/api/*', function(request, response, next){
    	// クエリー文字列を含めてurl情報を取得（trueオプションでクエリ文字列も取得）
    	urlInfo = url.parse(request.url, true);
    	// jsonでレスポンス（外部の人もアクセスできるようにAccess-Control-Allow-Originを設定）
	    response.contentType('json');
	    response.header('Access-Control-Allow-Origin', '*');
	    next();
	});
    app.get('/api/twitter/search', function(request, response) {
    	twitter.search(urlInfo,
            function(result){
                response.send(result);
            }
        );
    });
    app.get('/api/twitter/mentions', function(request, response) {
        twitter.mentions(urlInfo,
            function(result) {
                response.send(result);
            }
        );
    });

    // create application/json parser
    var jsonParser = bodyParser.json()
    // create application/x-www-form-urlencoded parser
    var urlencodedParser = bodyParser.urlencoded({ extended: false })
    app.post('/api/ubic/document', urlencodedParser, function(request, response) {
        console.log("recive /api/ubic/document");
        console.log('~~~~~~~~~~~~~~~~~~');
        console.log(request.body.documentId);
        var postBody = '{"documentId": ' + request.body.documentId + ', "categoryId": ' + request.body.categoryId + ', "text": "' + String(request.body).replace(/\r?\n/g, '') + '"}';
        console.log("##############");
        console.log(postBody);
        ubic.document(urlInfo, postBody,
            function(result){
               response.send(result);
            }
        );
    });

    app.post('/api/ubic/teacher', urlencodedParser, function(request, response) {
        console.log("recive /api/ubic/teacher");
        console.log(request.body);
        var postBody = '{"teacherId":'+request.body.teacherId+
        // ',"documents":{"relevant":'+request.body.relevant+
        ',"documents":{"relevant":'+'[1,3,4,5]'+
                                          // ',"notRelevant":'+request.body.notRelevant+
                                          // ' },"categoryId":'+request.body.categoryId+'}';
        "}}";
        console.log(postBody);

        ubic.teacher(urlInfo, postBody,
            function(result){
              console.log(result);
              //  response.send(result);
            }
        );
    });
    app.post('/api/ubic/leaningResult', function(request, response) {
        console.log("/api/ubic/leaningResult");
        var leaningResultPostBody = '{"teacherIds":1}';

        ubic.leaningResult(urlInfo, leaningResultPostBody,
            function(result){
               response.send(result);
            }
        );
    });

    app.post('/relevance_evaluator/api/deleteTeacher', function(request, response) {
        console.log('/relevance_evaluator/api/deleteTeacher');
        var body='';
        request.on('data', function (data) {
            body +=data;
        });
        request.on('end', function() {
            // console.log("body" + body);
            // var postBody=  qs.parse(body);
            ubic.document(urlInfo, body,
                function(result){
                   response.send(result);
                }
            );
        });
    });

    app.get('/api/facebook/search', function(request, response) {
    	facebook.search(urlInfo,
            function(result){
                response.send(result);
            }
        );
    });
}

module.exports = {configRoutes: configRoutes};
