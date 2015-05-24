'use strict';
var USER_NUM = $('tr').length - 1;

$('#mail-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		$('#' + i + ' div.mail').load('../data/User' + i + '.txt');
	}
});

$('#twitter-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		var id = $('#' + i).data('twitter-id');
		console.log('/api/twitter/search?q=@' + id);
		$.ajax({
			type: 'GET',
			url: '/api/twitter/search?q=@' + id,
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
	for (var i = 1; i <= USER_NUM; i++) {
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

$('#fb-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		var id = $('#' + i).data('fb-id');
		var token = $('#' + i).data('fb-token');
		fb('https://graph.facebook.com/v2.0/' + id + '/events?fields=description&access_token=' + token, i);
	}
});

function fb(url, i){
	$.ajax({
		type: 'GET',
		url: url,
		dataType: 'json',
		async: false,
		success: function(json){
			console.log(json);
			var text = json.data.reduce(function(pre, current){
				if(current.description) {
					return pre + current.description;
				} else {
					return pre;
				}
			}, '');
			$('#' + i + ' div.fb').append(text);
			if(json.paging.next){
				fb(json.paging.next, i);
			}
		}
	});
}
