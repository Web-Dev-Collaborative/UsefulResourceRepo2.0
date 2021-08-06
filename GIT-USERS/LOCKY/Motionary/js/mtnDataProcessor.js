var isRecord = 0;
var isReplay = 0;
var index = 0;
var mtnArr = new Array();
var playerObj;

$(function initialBtn(){
	$('#record-btn').click(function(e){
		console.log('Start Recording...');
		var count = 5, countdown;
		countdown = setInterval(function(){
			var seconds = count;
			$("#instruction").html("Attention! "+ seconds + " seconds to start recording");
			if (count == 0) {
				console.log('count = 0');
				playerObj.seekTo($('#start').html(), true);

				$('#record-btn').html('Recording...');
				isRecord = 1;
				clearInterval(countdown);
			}
			if(count>0)
				count--;
		}, 1000);
		mtnArr = new Array();
		start = new Date().getTime();
	});

	$('#replay-btn').click(function(e){
		isReplay = 1;
		index = 0;
	});

	$('#store-btn').click(function(){
		storeSkeletonData();
	});
})

function pushSkeletonData(i ,t, msg){
	mtnArr.push(i + ', ' +t + ', ' + msg[0] + ', ' + msg[1] + ', ' + -msg[2]);
}

function storeSkeletonData(){
	 var mtnStr = '';
     isRecord  = 0;
     // console.log(mtnArr);
     if(mtnArr.length>0){	
     	mtnStr = mtnArr.join(':');
     	// console.log(mtnStr);
     }	
     
     if(mtnStr!=''){
     	 $('#record-btn').html('Record');
     	 $('#store-btn').html('Storing...');

	     $.post("/kinect/mtnDataRetriver.php/store", {mtnData: mtnStr, vid: $('#vid').html()}, function(reMsg){
	     	console.log(reMsg);
	     	// mtnArr = new Array();
	     	$('#store-btn').html('store');
	     	if(reMsg.status==1)	
	     		$('.area_body').html('<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>We appreciate your contribution!</h1>You have contribute a moiton successfully.<br/><br/><a class="btn btn-default btn-lg btn-block" href="/kinect/video.php/dtls/'+reMsg.alphaid+'">Take me to the request page.</a></div></div>');
	     	else{
	     		$('#instruction').html('failed to store, please try agian.');
	     	}

	     },'json');
	 }else{
	 	return;
	 }
}

function replayMtn(){
	$('#record-btn').html('Record');
	k_camera.position.z = 800;
	k_camera.position.y = -350;

	if(index>=(mtnArr.length/24)){
		isReplay = 0;
		k_camera.position.z = 250;
		k_camera.position.y += (200 - k_camera.position.y ) * .05;

	}
	for(var i = 0; i < skeletonPoints.length; i++) {
					var tempArr;
					// console.log(mtnArr[index*24+i]);
					var object = skeletonPoints[i];

					if(typeof mtnArr[index*24+i]!='undefined'){
						tempArr = mtnArr[index*24+i].split(', ');
					}else{
						continue;
					}

	                // console.log((index*24+i)+': '+tempArr[2]+', '+tempArr[3]+', '+tempArr[4]);
	                object.position.x = tempArr[2] / 5;
	                object.position.y = tempArr[3] / 5;
	                object.position.z = - (tempArr[4] / 5);
	                // console.log(i+"=>"+object.position.x+", "+object.position.y+", "+object.position.z);
	}
	index++;
	// console.log(index);
}

function onYouTubePlayerReady(playerId) {
    playerObj = document.getElementById("myRecordPlayer");
}