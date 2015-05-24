'use strict';
var USER_NUM = $('tr').length;

google.load('visualization', '1', {
    packages: ['corechart', 'bar']
});
google.setOnLoadCallback(drawStacked);

function drawStacked() {
	var data = new google.visualization.DataTable();
	data.addRows(USER_NUM);
	data.addColumn("string", "名前");
	data.addColumn("number", "スコア");
	for(var i = 0; i < USER_NUM; i++){
		console.log($('#' + i + ' .name'));
		data.setValue(i, 0, $('#' + i + ' .name').text());
		data.setValue(i, 1, $('#' + i + ' .score').text());
	}
    var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
    chart.draw(data);
}