'use strict'

var URL = 'http://180.42.27.182/';
var EP1 = 'document_analyzer/api/document';
var data = { documentId: 'test1', categoryId: 400, text: 'test' };

$.ajax({
	type: 'POST',
	url: URL + EP1,
	data: data
}).done(function( res ) {
	console.log(res);
});