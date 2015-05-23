'use strict';
var configRoutes;
var url = require('url');
var twitter = require('./twitter');
var facebook = require('./facebook');
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
    app.get('/api/facebook/search', function(request, response) {
    	facebook.search(urlInfo,
            function(result){
                response.send(result);
            }
        );
    });
}

module.exports = {configRoutes: configRoutes};