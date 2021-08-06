<?php

$out['self'] = 'application';
require 'header.php';
include "connectSql.php";

$libary = '';

if(isGET('act')&&isLogin()){
	$vid = $_GET['act'];
	$libary .= '
	<script src="/kinect/js/loadAvatar.js"></script>
	<script type="text/javascript" src="/kinect/js/Three.js"></script>
    <script src="/kinect/js/zig.min.js"></script>
    <script type="text/javascript" src="/kinect/js/mtnDataProcessor.js"></script>';

	$row =  mysql_fetch_array(searchVideoByID($vid));

	$out['content'] = $libary.'
	
	<div class="row">
		<div class="col-lg-4 col-lg-offset-2">
			<div id="video_sec">
				<img src="http://thecogentcoach.com/wordpress/wp-content/uploads/2012/11/video-play-2.gif" style="width:350px;">
			</div>
		</div>
		<div id="area_motion" class="col-lg-4">
			<div class="btn-group">
			  <button type="button" id="record-btn" class="btn btn-default">錄製</button>
			  <button type="button" id="replay-btn" class="btn btn-default">重播</button>
			  <button type="button" id="store-btn" class="btn btn-default">儲存</button>
			</div>
			
		</div>
	</div>
	
	<div class="row">
		<div id="instruction" class="col-lg-8 col-lg-offset-2 alert alert-info">
				按下「錄製」鍵後，請站到您的Kinect前面 :)
		</div>
	</div>
	
	<div id="vid" style="display:none">'.$vid.'</div>
	<div id="yvid" style="display:none">'.$row['ytoutubeID'].'</div>
	<div id="start" style="display:none">'.$row['start'].'</div>
	<div id="end" style="display:none">'.$row['end'].'</div>';

}
else{
	if(!isLogin()){
		$out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>抱歉!</h1>請先使用Google賬戶登入系統。</div></div>';
	}else if(isLogin()){
		redirect('application.php/act');
	}
}
require 'footer.php';

?>
