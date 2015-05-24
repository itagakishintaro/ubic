'use strict';
var configRoutes;
var url = require('url');
var qs = require('querystring');
var twitter = require('./twitter');
var facebook = require('./facebook');
// var fql = require('./fql');
var ubic = require('./ubic');
var urlInfo;

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

    app.post('/api/ubic/document', function(request, response) {
        console.log("recive /api/ubic/document");
        var body='';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function() {
            console.log("body ==== " + body);
            var postBody=  qs.parse(body);
            // console.log("Object"+Object.prototype.toString.call(data).slice(8, -1));
            // console.log("body " body.nodeName);

            ubic.document(urlInfo, postBody,
                function(result){
                   response.send(result);
                }
            );
        });
    });
    app.post('/relevance_evaluator/api/teacher', function(request, response) {
        console.log("recive /relevance_evaluator/api/teacher");
        var body='';
        request.on('data', function (data) {
            body +=data;
        });
        request.on('end', function() {
            // console.log("body" + body);
            var postBody=  qs.parse(body);
            ubic.document(urlInfo, body,
                function(result){
                   response.send(result);
                }
            );
        });
    });
    app.post('/relevance_evaluator/api/leaningResult', function(request, response) {
        console.log("recive /relevance_evaluator/api/leaningResult");
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
    app.post('/relevance_evaluator/api/deleteTeacher', function(request, response) {
        console.log('/relevance_evaluator/api/deleteTeacher');
        var body='';
        request.on('data', function (data) {
            body +=data;
        });
        request.on('end', function() {
            // console.log("body" + body);


            var postBody=  qs.parse(body);
            // var postBody = body.toString();
            console.log('~~~~~~~~~~~~~~~~~~');
            console.log(body);
            // postBody = '{ "documentId": ' + Number(obj.documentId) + ', "categoryId": ' + Number(obj.categoryId) + ', "text": "' + obj.text + '"}'
            console.log("##############");
            console.log(postBody);
            ubic.document(urlInfo, postBody,
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
