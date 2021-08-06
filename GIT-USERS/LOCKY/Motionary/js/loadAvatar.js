var k_camera, k_scene, k_renderer;
var skeletonPoints = [];
var start;
//Initiate the three.js scene that we are going to draw dots onto.
//This is the black kinectSkeletonBox div

window.onload = function(){
    var params = { allowScriptAccess: "always" };
    var atts = { id: "myRecordPlayer" };
    var videoId = $("#yvid").html();

    k_init();
    k_animate();
    //stop playing the video in video.php
    // playerObj.stopVideo();

    //load the video
    swfobject.embedSWF("http://www.youtube.com/v/"+videoId+"?enablejsapi=1&playerapiid=replayplayer&version=3",
        "video_sec", "350", "350", "8", null, null, params, atts);
}


function k_init() {
    var k_container = document.getElementById('area_motion');
    var width = 400;
    var height = 500;

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
        sphere.position.x = 0;   
        sphere.position.y = 0;
        sphere.position.z = 0;
        k_scene.add(sphere);
        skeletonPoints.push(sphere);
    }


}


var current_user;
function zigPluginLoaded() {
    zig.init(document.getElementById("zigPlugin"));
    console.log("zig plugin loaded");
    
    zig.addEventListener('userfound', function(user) {
        $('#instruction').html('我們偵測到你了！ 請按下「錄製」鍵 :)');
        current_user = user;
        current_user.addEventListener('userupdate', function(user) {
            //This is called every time the kinect has new user skeleton data
            if(isRecord){
                $('#instruction').html('收集動作資料中...');
            }
            if(!isReplay)
                moveDots(user);
        });
        zig.addListener(current_user);
    });
    zig.addEventListener('userlost', function(user) {
        console.log('抱歉，我們偵測不到你，ID: ' + user.id);
        // sendData();
        $('#record-btn').html('錄製');
        $('#instruction').html('請先按下「錄製」鍵後，再站到您的Kinect前面');

    });
}

function moveDots(user){
    for(var i = 0; i < skeletonPoints.length; i++) {
            //Loop through each of the dots
            var kinectFeedPart = user.skeleton[i+1];
                // console.log(zig.Joint);
                //Get data information for each joint.
                if( typeof kinectFeedPart == 'undefined') { //If joint data isnt avaiable place dot offscreen and continue on.
                    var object = skeletonPoints[i];
                    object.position.x = 5000;
                    object.position.y = 5000;
                    if(isRecord)
                        pushSkeletonData(i ,t, [5000,5000,5000]);
                    continue;
                }
                var kinectFeedPosition = kinectFeedPart.position;
                var object = skeletonPoints[i];
                object.position.x = kinectFeedPosition[0] / 5;
                object.position.y = kinectFeedPosition[1] / 5;
                object.position.z = -kinectFeedPosition[2] / 5;
                var t = new Date().getTime() - start;
                if(isRecord){
                    // console.log(i+"=>"+object.position.x+", "+object.position.y+", "+object.position.z);
                    pushSkeletonData(i ,t, kinectFeedPart.position);
                }
    }
}

///Animating and rendering for three.js scene

function k_animate() {
    requestAnimationFrame(k_animate);
    if(isReplay){
        replayMtn();
    }
    k_render();
    // console.log(new Date().getTime());
}

function k_render() {
    k_camera.position.x += (0 - k_camera.position.x ) * .05;
    k_camera.position.y += (200 - k_camera.position.y ) * .05;
    // console.log(k_camera);
    k_camera.lookAt(k_scene.position);
    // console.log(k_scene.position);
    k_renderer.render(k_scene, k_camera);
}