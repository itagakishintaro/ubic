'use strict';

$('ubic-document-btn').on('click', function(){

});

$('#ubic-teacher-btn').on('click', function(){
	$('[class="teacher"]:checked').each(function(i, v){
		console.log($(v).val() );
	});
});