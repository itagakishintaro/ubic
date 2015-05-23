'use strict';
var USER_NUM = $('tr').length - 1;

$('#mail-btn').on('click', function(){
	for (var i = 0; i <= USER_NUM; i++) {
		$('#' + i + ' div.mail').load('../data/User' + i + '.txt');
	}
});

$('#twitter-btn').on('click', function(){
	for (var i = 0; i <= USER_NUM; i++) {
		var id = $('#' + i).data('twitter-id');
		$.ajax({
			type: 'GET',
			url: '/api/twitter/search?q=' + id,
			dataType: 'json',
			async: false,
			success: function(json){
				var text = json.statuses.reduce(function(pre, current){
					return pre + current.text;
				}, '');
				$('#' + i + ' div.twitter').text(text);
			}
		});
	}
});

$('#qiita-btn').on('click', function(){
	for (var i = 0; i <= USER_NUM; i++) {
		var id = $('#' + i).data('qiita-id');
		$.ajax({
			type: 'GET',
			url: 'https://qiita.com/api/v2/users/' + id + '/items',
			dataType: 'json',
			async: false,
			success: function(json){
				var text = json.reduce(function(pre, current){
					return pre + current.body;
				}, '');
				$('#' + i + ' div.qiita').text(text);
			}
		});
	}
});