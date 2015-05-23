'use strict';
var USER_NUM = $('tr').length - 1;

$('#ubic-document-btn').on('click', function(){
	var userData = [];
	for (var i = 1; i <= USER_NUM; i++) {
		userData[i] = '';
		userData[i] += $('#' + i + ' .mail').text();
		userData[i] += $('#' + i + ' .twitter').text();
		userData[i] += $('#' + i + ' .qiita').text();
		userData[i] += $('#' + i + ' .rec-text').text();
		console.log(userData[i]);
	}
});

$('#ubic-teacher-btn').on('click', function(){
	$('[class="teacher"]:checked').each(function(i, v){
		console.log($(v).val() );
	});
});