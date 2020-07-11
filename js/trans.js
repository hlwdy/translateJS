function reload(){
	text=$('#search-input').val();
	if(text.trim()==''){
		document.getElementById('output1').hidden = true;
		document.getElementById('output2').hidden = true;
		$('#res').val('');
		return;
	}
	var tk=gettk(text,'442788.2585626513');
	//console.log(tk);
	var http = (window.location.protocol === 'http:' ? 'http:' : 'https:');
	$.post(http + '//cors-anywhere.herokuapp.com/'+'https://translate.google.cn/translate_a/single?client=webapp&sl='+$('#from').val()+'&tl='+$('#to').val()+'&dt=at&dt=bd&dt=ex&dt=ld&dt=md&dt=qca&dt=rw&dt=rm&dt=sos&dt=ss&dt=t&otf=1&ssel=0&tsel=0&tk='+tk+'&q='+encodeURIComponent(text),{ q : text },function(data, textStatus){
		res=data[0][0][0];
		$('#res').val(res);
        self.location='#from='+$('#from').val()+'&to='+$('#to').val()+'&q='+$('#search-input').val();
		if(data[1]==null){
			document.getElementById('output1').hidden = true;
			document.getElementById('output2').hidden = true;
			return;
		}
		len = data[1].length;
		var htmlT='<span id="tt">翻译</span><ol>';
		for(var i=0; i < len; i++){
			htmlT+='<li style="font-size:19px;color:#5893f5;">'+data[1][i][0]+'</li>';
			for(var j=0; j < data[1][i][2].length; j++){
				htmlT+='<li style="font-size:15px;color: rgba(0,0,0,0.60);" id="tlst"><span style="font-size:17px;color:black;" id="tls">'+data[1][i][2][j][0]+': </span> '+data[1][i][2][j][1]+'</li>';
			}
		}
        $('#output1').html(htmlT+'</ol>');
		htmlT='<span id="tt">定义</span><ol>';
		len = data[12].length;
		for(var i=0; i < len; i++){
			htmlT+='<li style="font-size:19px;color:#5893f5;">'+data[12][i][0]+'</li>';
			for(var j=0; j < data[12][i][1].length; j++){
				htmlT+='<li style="font-size:15px;color: rgba(0,0,0,0.60);" id="tlst">'+(j+1)+'. '+data[12][i][1][j][0]+'</li>';
				if(data[12][i][1][j][2]!=null)htmlT+='<li style="font-size:15px;">"'+data[12][i][1][j][2]+'"</li>';
			}
		}
		htmlT=htmlT+'</ol>';
		if(data[13]!=null){
			htmlT=htmlT+'<span id="tt">例句</span><ol>';
			len = data[13][0].length;
			for(var i=0; i < len; i++){
				htmlT+='<li style="font-size:15px;" id="tlst">'+(i+1)+'. '+data[13][0][i][0]+'</li>';
			}
			htmlT=htmlT+'</ol>';
		}
		$('#output2').html(htmlT);
		document.getElementById('output1').hidden = false;
        document.getElementById('output2').hidden = false;
	});
};
$(document).ready(function(){
    var text = document.querySelector('#search-input');
    var iTime;
    text.addEventListener('input', function () {
        $('#res').val('.....');
        clearTimeout(iTime);
        iTime = setTimeout(function(){reload();}, 480);
    }, false);
    $('#to').change(function(){
        $('#res').val('.....');
        reload();
    });
    $('#from').change(function(){
        $('#res').val('.....');
        reload();
    });
});
function TTS(){
	var ttsDiv = document.getElementById('ttts_div_id');
	var ttsAudio = document.getElementById('tts_autio_id');
	var ttsText = $('#res').val();
	var ttsto=document.getElementById('to').value;
	ttsDiv.removeChild(ttsAudio);
	var tk=gettk(ttsText,'442788.2585626513');
	var au1 = '<audio id="tts_autio_id" autoplay="autoplay">';
	var sss = '<source id="tts_source_id" src="https://translate.google.cn/translate_tts?ie=UTF-8&q='+encodeURIComponent(ttsText)+'&tl='+ttsto+'&total=1&idx=0&tk='+tk+'&client=webapp&textlen='+ttsText.length.toString()+'">';
	var eee = '<embed id="tts_embed_id" height="0" width="0" src="">';
	var au2 = '</audio>';
	ttsDiv.innerHTML = au1 + sss + eee + au2;
	ttsAudio = document.getElementById('tts_autio_id');
	ttsAudio.play();
}
