var playerObj;


window.onload = function() {
	
	var sampleTags = ['running', 'jump', 'run', 'coldfusion', 'javascript', 'asp', 'ruby', 'python', 'c', 'scala', 'groovy', 'haskell', 'perl', 'erlang', 'apl', 'cobol', 'go', 'lua'];
	var working = false;

	//this part is about requester's data

	$('#videoInput').keypress(function(e){
		$(".video_container").hide("fade",1000);
		if (e.which == 13){
			e.preventDefault();
			console.log($("#video_sec"));
			var params = { allowScriptAccess: "always" };
			var atts = { id: "myPlayer" };
			var videoId = $("#videoInput").val();
			
			swfobject.embedSWF("http://www.youtube.com/v/"+videoId+"?enablejsapi=1&playerapiid=ytplayer&version=3",
				"video_sec", "370", "300", "8", null, null, params, atts);
		}
			
		$(".video_container").show("fade",1000);

	});
	
	$('#singleFieldTags').tagit({
				availableTags: sampleTags,
                // This will make Tag-it submit a single form value, as a comma-delimited field.
                singleField: true,
           	    singleFieldNode: $('#mySingleField'),
           	    allowSpaces: true
    });

	$('#form-request-video').submit(function(e){
		e.preventDefault();
		if(working)
			return;
		working = true;
		$('span.label-warning').remove();

		var data = $(this).serialize()+'&tag='+$('#mySingleField').val();
		console.log(data);
		$('#btn-request-vid').html('送出中...');
		NProgress.start();
		$.post('/kinect/dataProcessor.php/reqvid',data,function(msg){
			NProgress.done();	
			working = false;
			$('#btn-request-vid').html('完成');
			if(msg.status==1){
				console.log("status "+msg.status);
				$('.area_body').html('<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>太棒了!</h1>你成功送出了一個動作影片任務.<br/><br/><a class="btn btn-default btn-lg btn-block" href="/kinect/video.php/dtls/'+msg.alphaid+'">看看您的任務</a></div></div>');
			}else{
				$.each(msg.errors,function(k,v){
					$('label[for='+k+']').append('<span class="label label-warning">'+v+'</span>');
				});
			}
		},'json');

	});


	//When user update their information 

    $('#form-user-update').submit(function(e){
		e.preventDefault();
		if(working)
			return;
		working = true;
		var data = $(this).serialize();
		console.log(data);
		$('#btn-upd-user').html('更新中...');
		NProgress.start();		
		$.post('/kinect/dataProcessor.php/upduser',data,function(msg){
			NProgress.done();
			working = false;
			$('#btn-upd-user').html('更新您的資訊');
			if(msg.status==1){
				console.log("status "+msg.status);
    	        location.reload();
			}
		},'json');

	});


	$('#form-request-update').submit(function(e){
		e.preventDefault();
		if(working)
			return;
		working = true;
		var data = $(this).serialize();
		console.log(data);
		$('#btn-upd-request').html('編輯中...');
		NProgress.start();		
		$.post('/kinect/dataProcessor.php/updrqst',data,function(msg){
			NProgress.done();
			working = false;
			$('#btn-upd-request').html('完成編輯');
			if(msg.status==1){
				console.log("status "+msg.status);
    	        window.location = "/kinect/video.php/dtls/"+msg.identity;
			}
		},'json');

	});

};


function onYouTubePlayerReady(playerId) {
	console.log(playerId);
	playerObj = document.getElementById("myPlayer");
	playerObj.playVideo();
	$(function() {
				$( "#slider-range" ).slider({
					range: true,
					min: 0,
					max: playerObj.getDuration(),
					values: [ 0, playerObj.getDuration() ],
					slide: function( event, ui ) {
						// console.log(ui);
						$( "#start_input").val(Math.floor(ui.values[0]/60)+"m "+ui.values[0]%60+"s");
						$( "#end_input").val(Math.floor(ui.values[1]/60)+"m "+ui.values[1]%60+"s");
						$( "#start_input_value").val(ui.values[0]);
						$( "#end_input_value").val(ui.values[1]);
						playerObj.seekTo(ui.value, true);

					}
				});
				
	});
}