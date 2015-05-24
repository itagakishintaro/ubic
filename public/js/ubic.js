'use strict';
var USER_NUM = $('tr').length - 1;
var CATEGORY_ID = 401;
var TEACHER_ID = 1;

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
			"categoryId": CATEGORY_ID,
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
	var relevant = [];
	$('[class="teacher"]:checked').each(function(i, v){
		relevant.push( $(v).val() );
	});
	var data = {
		"teacherId": TEACHER_ID,
		"documents": {
			"relevant": relevant
		},
		"categoryId": CATEGORY_ID
	};

	$.ajax({
			type: 'POST',
			url: '/api/ubic/teacher',
			data: data,
			dataType: 'json',
			async: false,
			success: function(json){
				console.log(json);
			}
		});
});

$('#ubic-leaningResult-btn').on('click', function(){
	var data = {
		"teacherId": TEACHER_ID
	};

	$.ajax({
			type: 'POST',
			url: '/api/ubic/leaningResult',
			data: data,
			dataType: 'json',
			async: false,
			success: function(json){
				console.log(json);
			}
		});
});

$('#ubic-deleteTeacher-btn').on('click', function(){
	var data = {
		"teacherIds": [TEACHER_ID]
	};

	$.ajax({
			type: 'POST',
			url: '/api/ubic/deleteTeacher',
			data: data,
			dataType: 'json',
			async: false,
			success: function(json){
				console.log(json);
			}
		});
});