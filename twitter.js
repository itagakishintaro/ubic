'use strict';
// https://www.npmjs.com/package/node-twitter
var Twitter = require('twitter');

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

//キーワードで検索
function search(urlInfo, callback){
	var options = {};
	if( urlInfo.query.q ) {
		options.q = urlInfo.query.q
	}
	if( urlInfo.query.count ) {
		options.count = urlInfo.query.count
	}
	if( urlInfo.query.filter ) {
		options.filter = urlInfo.query.filter
	}
	client.get('search/tweets', options, function(error, tweets, response){
   		callback(tweets);
	});
}

module.exports = {
    search: search
}