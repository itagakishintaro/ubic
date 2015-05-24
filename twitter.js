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

function mentions(urlInfo, callback){
	var info = {};
	info.consumer_key = urlInfo.query.consumer_key;
	info.consumer_secret = urlInfo.query.consumer_secret;
	info.access_token_key = urlInfo.query.access_token_key;
	info.access_token_secret = urlInfo.query.access_token_secret;
	client = new Twitter(info);
	client.get('https://api.twitter.com/1.1/statuses/mentions_timeline.json', function(error, mentions, response){
   		callback(mentions);
	});
}

module.exports = {
    search: search,
    mentions: mentions
}