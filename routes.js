'use strict';
var configRoutes;
var url = require('url');
var qs = require('querystring');
var twitter = require('./twitter');
var facebook = require('./facebook');
// var fql = require('./fql');
var ubic = require('./ubic');
var urlInfo;

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

        // var data = '';
        // request.on('data', function(chunk) {
        //         data += chunk;
        //       });
        // request.on('end', function() {
        //         //終了処理
        //         console.log('終了処理');
        //
        //        //queryオブジェクトにフォーム送信データを格納する
        //        var query = qs.parse(data);
        // });

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
