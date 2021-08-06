var k_camera, k_scene, k_renderer;
var skeletonPoints = [];
var start;
var index = 0;
var mtnArr;
var isReplay = 0;
var startTime = 0;
var rplayerObj;
var playerObj;
var mouseX = 0, mouseY = 0,
windowHalfX = window.innerWidth / 2,
windowHalfY = window.innerHeight / 2;

window.onload = function() {
	var params = { allowScriptAccess: "always" };
	var atts = { id: "myPlayer" };
	var videoId = $("#ytoutubeID").html();
    // var playTimer;
    k_init();
    k_animate();
    if(videoId!='undefined'){
	   swfobject.embedSWF("http://swf.tubechop.com/tubechop.swf?vurl="+videoId+"&start="+$('#start-time').html()+"&end="+$("#end-time").html(),
	   	"video_sec", "289", "250", "8", null, null, params, atts);
    }

    $('#play-video-btn').click(function(){
        // clearTimeout(playTimer);
        // playerObj.seekTo($('#start-time').html(), true);
        // playTimer = setTimeout(function(){playerObj.stopVideo()}, parseInt(($('#period').html()))*1000);
    });


    $('#deleteBtn').click(function(){
        console.log('delete');
        if(confirm("注意!確定要刪除嗎？")){
            $.post("/kinect/dataProcessor.php/deletev",{alphaid:$('#alphaid').html()},function(reMsg){
                if(reMsg.status==1){
                    window.location = "/kinect/video.php";
                }
            },"json");
        }
        else{
            
        }
        
    });

	

}

function tagSearch(data){
                    alert('het');
                    $.post('/kinect/search.php/info',{tag: data},function(msg){
                        // console.log(msg);
                        if(msg.status==1){
                            console.log("status "+msg.status);
                            var htmlfarg = 'Result:<br/>';
                            var identities = msg.identity;
                            var ytoutubeIDs = msg.ytoutubeID;
                            var requestTimes = msg.requestTime;

                            for(var i = 0; i<identities.length ;i++){
                                htmlfarg += '<div class="col-sm-6 col-md-3 video-block" style="margin-bottom:5px;"><a class="list-video-btn" href="/kinect/video.php/dtls/'+identities[i]+'"><div class="thumbnail"><img class="video-thumbnail" src="http://img.youtube.com/vi/'+ytoutubeIDs[i]+'/0.jpg" alt="..."><div class="caption">'+ytoutubeIDs[i]+'</div><div class="caption" style="text-align:right;">Requested <abbr class="timeago" title="'+requestTimes[i]+'"></abbr></div></div></div></a></div>';
                            }
                            $('.area_body').html(htmlfarg);
                        }else if(msg.status==2){
                            $('.area_body').html('<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>Sorry!</h1> We could not find the related motions whose tag is <span class="label label-danger">'+msg.tag+'</span></div></div>');
                        }else{
                            $('.area_body').html('<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>Error!</h1>Please Login in first to enjoy our service.</div></div>');
                        }
                        jQuery("abbr.timeago").timeago();
                    },'json');    
}

function getReplayPage(id){
    // this function is called to initialize the replay page when users click the replay this motion btn.
    var working = true;
    var params = { allowScriptAccess: "always" };
    var atts = { id: "myRePlayer" };
    var videoId = $("#ytoutubeID").html();
    //stop playing the video in video.php
    // playerObj.stopVideo();

    //load the video
    $('.video_div').html('<div id="video_replay_sec"></div>');
    $('#replay-btn').html('Loading motion data, please wait...');
    $('#replay-btn').addClass('disabled');

    $.post("/kinect/mtnDataRetriver.php/retrieve", {mid: id}, function(reMsg){
            working = false;
            console.log(reMsg);
            // mtnArr = new Array();
            swfobject.embedSWF("http://www.youtube.com/v/"+reMsg.youtubeID+"?enablejsapi=1&playerapiid=replayplayer&version=3",
                                    "video_replay_sec", "300", "350", "8", null, null, params, atts);
            
            $('#replay-btn').click(function(){
                if(!working){    
                    index = 0;
                    isReplay = 1;
            // alert($('#start-time').html());
                    rplayerObj.seekTo(reMsg.start_time, true);
                 }

            });

            $('#contributor').html(reMsg.contributor);
            $('#replay-btn').html('即刻重播！');
            $('#replay-btn').removeClass('disabled');
            

            $('#star').raty({ path: 'http://lockys.hopto.org/kinect/js/rat-lib/img/', size     : 24,
                              starHalf : 'star-half-big.png',
                              starOff  : 'star-off-big.png',
                              starOn   : 'star-on-big.png', 
                              click: function(score, evt) {
                                $('#star').html('評分中...');
                                $.post("/kinect/dataProcessor.php/rate",{scores : score, mid : id},function(reMsg){
                                    console.log(reMsg);
                                    if(reMsg.status==0)
                                        $('#star').html('你已經評過這個動作了');
                                    else if(reMsg.status==1){
                                        $('#star').html('成功評分!');
                                        location.reload();
                                    }else{
                                        $('#star').html('不行評自己的動作資料');
                                    }
                                },"json");
                                
                                // alert('ID: ' + $(this).attr('id') + "\nscore: " + score + "\nevent: " + evt);
                              }
                              // readOnly: function(score) {
                              //   alert(score);
                              //   return score != null;
                              //   }
                            });
            mtnArr = reMsg.mtnArr.split(':'); 
    },'json');

    

    $('#myModal').on('hidden.bs.modal', function () {
        index = 0;
        isReplay = 0;
        for(var i = 0; i < skeletonPoints.length; i++) {
            var object = skeletonPoints[i];
            object.position.x = 5000;
            object.position.y = 5000;
            object.position.z = 5000;

        }   
        $('#replay-btn').html('即刻重播!');
        // location.reload();
    })
}


function onYouTubePlayerReady(playerId) {
    rplayerObj = document.getElementById("myRePlayer");   
    playerObj = document.getElementById("myPlayer");    

}



function k_init() {
    var k_container = document.getElementById('area_motion');
    var width = 400;
    var height = 350;

    k_camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
    
    k_camera.position.z = 250;
    k_scene = new THREE.Scene();
    k_renderer = new THREE.CanvasRenderer();
    k_renderer.setSize(width, height);
    k_container.appendChild(k_renderer.domElement);

   

    // skeleteon points initializations
    var geometry = new THREE.Geometry();

    for(var i = 0; i < 24; i++) {
        //Make 24 white circles for each of the joints we are going to recieve from the kinect feed.
        var sphere = null;
        if(i == 1){
            sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 6, 5), new THREE.MeshBasicMaterial({color: 0xCC0000, opacity:0.5, transparent:true}));
        }
        else{
            sphere = new THREE.Mesh(new THREE.SphereGeometry(10, 6, 5), new THREE.MeshBasicMaterial({color: 0x6666FF, opacity:0.5, transparent:true}));
        }
        sphere.overdraw = true;
        sphere.position.x = 1;   
        sphere.position.y = 1;
        sphere.position.z = 1;
        k_scene.add(sphere);
        skeletonPoints.push(sphere);
    }
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'touchstart', onDocumentTouchStart, false );
    document.addEventListener( 'touchmove', onDocumentTouchMove, false );

}
///Animating and rendering for three.js scene

function k_animate() {
    requestAnimationFrame(k_animate);
    if(isReplay){
        if(rplayerObj.getPlayerState()==1)
            replayMtn();
    }
    k_render();
    // console.log(new Date().getTime());
}

function k_render() {
    k_camera.position.x += (mouseX + 0 - k_camera.position.x ) * .05;
    k_camera.position.y += (-mouseY + 200 - k_camera.position.y ) * .05;
    // console.log(k_camera);
    k_camera.lookAt(k_scene.position);
    // console.log(k_scene.position);
    k_renderer.render(k_scene, k_camera);
}

//replay function
function replayMtn(){
	k_camera.position.z = 800;
	// k_camera.position.y = -350;

	for(var i = 0; i < skeletonPoints.length; i++) {
					var tempArr;
					// console.log(mtnArr[index*24+i]);
                    var object = skeletonPoints[i];

					if(typeof mtnArr[index*24+i]!='undefined'){
						tempArr = mtnArr[index*24+i].split(', ');
					}else{
                        for(var i = 0; i < skeletonPoints.length; i++) {
                            var object = skeletonPoints[i];
                            object.position.x = 5000;
                            object.position.y = 5000;
                            object.position.z = 5000;
                            
                        }    
                        
                        isReplay = 0;

                        rplayerObj.stopVideo();

                        $('#replay-btn').html('Replay this motion now!');
						continue;
					}
                    if(index==1){
                        // alert('fuck');
                        startTime = tempArr[1];
                    }
                    $('#replay-btn').html(((tempArr[1]-startTime)/1000).toFixed(3)+' s');
	                // console.log((index*24+i)+': '+tempArr[2]+', '+tempArr[3]+', '+tempArr[4]);
	                object.position.x = tempArr[2] / 5;
	                object.position.y = tempArr[3] / 5;
	                object.position.z = - (tempArr[4] / 5);
	                // console.log(i+"=>"+object.position.x+", "+object.position.y+", "+object.position.z);
	}

	index++;
	// console.log(index);
}


function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;
    mouseY = event.clientY - windowHalfY;

}

function onDocumentTouchStart( event ) {

    if ( event.touches.length > 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}

function onDocumentTouchMove( event ) {

    if ( event.touches.length == 1 ) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        mouseY = event.touches[ 0 ].pageY - windowHalfY;

    }

}