'use strict';
var USER_NUM = $('tr').length - 1;

$('#ubic-document-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		var text = '';
		text += $('#' + i + ' .mail').text();
		text += $('#' + i + ' .twitter').text();
		text += $('#' + i + ' .qiita').text();
		text += $('#' + i + ' .rec-text').text();
		console.log(text);
		var data = {
			"documentId": i,
			"categoryId": 401,
			"text": text
		};
		console.log(data);
		$.ajax({
			type: 'POST',
			url: '/api/ubic/document',
			data: data,
			dataType: 'json',
			async: false,
			success: function(json){
				console.log(json);
			}
		});
	}
});

$('#ubic-teacher-btn').on('click', function(){
	$('[class="teacher"]:checked').each(function(i, v){
		console.log($(v).val() );
	});
});