var state, recText;
$('.startRec').on('click', function(){
    state = $(this).nextAll('.rec-state');
    recText = $(this).nextAll('.rec-text');
    console.log(state.text());
    console.log(recText.text());
    startRecognition();
});


// ----------
var recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";

//認識開始+設定の変更
function startRecognition() {
    //連続認識
    recognition.continuous = true;
    //中間結果の表示
    recognition.interimResults = true;
    recognition.start();
}
//話し声の認識中
recognition.onsoundstart = function() {
    state.text("認識中");
};
//マッチする認識が無い
recognition.onnomatch = function() {
    recText.text("もう一度試してください");
};
//エラー
recognition.onerror = function() {
    recText.text("エラー");
};
//話し声の認識終了
recognition.onsoundend = function() {
    state.text("停止中");
};
//認識が終了したときのイベント
recognition.onresult = function(event) {
    var results = event.results;
    for (var i = event.resultIndex; i < results.length; i++) {
        //認識の最終結果
        if (results[i].isFinal) {
            recText.text(results[i][0].transcript);
        }
        //認識の中間結果
        else {
            recText.text(results[i][0].transcript);
        }
    }
};