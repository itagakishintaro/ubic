'use strict'

var URL = 'http://180.42.27.182/';
var EP1 = 'document_analyzer/api/document';
var data = { documentId: 2, categoryId: 400, text: 'test' };

function ubic1(urlInfo, callback) {
	var request = require('request');

	var options = {
	  url: URL + EP1,
	  headers: {  'Content-Type': 'application/json' },
	  json: true,
	  body: '{' + JSON.stringify(data) + '}'
	};

	request.post(options, function(error, response, body){
	  if (!error && response.statusCode == 200) {
	    callback(body.name);
	  } else {
	    callback(response);
	  }
	});
}

module.exports = {
    ubic1: ubic1
}