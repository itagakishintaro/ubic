'use strict';
var USER_NUM = $('tr').length - 1;

$('#mail-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		$('#' + i + ' div.mail').load('../data/User' + i + '.txt');
	}
});

$('#twitter-btn').on('click', function(){
	for (var i = 1; i <= USER_NUM; i++) {
		if( $('#' + i).data('twitter-ck') === '' ) continue;
		var consumer_key = $('#' + i).data('twitter-ck');
		var consumer_secret = $('#' + i).data('twitter-cs');
		var access_token_key = $('#' + i).data('twitter-tk');
		var access_token_secret = $('#' + i).data('twitter-ts');
		var url = '/api/twitter/mentions';
		url += '?consumer_key=' + consumer_key;
		url += '&consumer_secret=' + consumer_secret;
		url += '&access_token_key=' + access_token_key;
		url += '&access_token_secret=' + access_token_secret;
console.log(url);

		$.ajax({
			type: 'GET',
			url: url,
			dataType: 'json',
			async: false,
			success: function(json){
				console.log(json);
				var text = json.reduce(function(pre, current){
					return pre + current.text;
				}, '');
				$('#' + i + ' div.twitter').text(text);
			}
		});
		setTimeout(function(){
			console.log(i);
		}, 500);
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
