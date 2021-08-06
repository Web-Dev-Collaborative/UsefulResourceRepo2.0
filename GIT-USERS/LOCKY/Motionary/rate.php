<?php
	$out['self'] = 'rate';	
	require 'header.php';
	include "connectSql.php";
	
	require_once('lib/PhpConsole.php');
	
	PhpConsole::start();


	if(isGET('list')){
		$library = '<script type="text/javascript" src="/kinect/js/video.js"></script>
		<script type="text/javascript" src="/kinect/js/Three.js"></script>
		<script type="text/javascript" src="/kinect/js/rat-lib/jquery.raty.js"></script>';

		$listWholeMotion = listWholeMotion();
		$out['content'] = $library.'
			<div class="row">
				<div class="panel-body">
					'.$listWholeMotion['htmlFrag'].'
				</div>
			</div>
			<!-- Modal -->
		  <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
		    <div class="modal-dialog" style="width:900px;">
		      <div class="modal-content" style="">
		        <div class="modal-header">
  						<h1>3D Motion Replayer<small>   動作資料貢獻者：<span id="contributor"><span></small></h1>
		        </div>
		        <div class="modal-body row">
		        <div class="col-lg-5 col-lg-offset-1 video_div">
		        </div>
		        <div class="col-lg-4" id="area_motion">
					
		        </div>
		        <div class="row col-lg-8 col-lg-offset-2" style="margin-top:15px;">
		        	<button class="btn btn-primary btn-lg btn-block disabled" id="replay-btn">Loading...</button>
		        </div>

		        </div>
				
		        <div class="modal-footer">
		        	<p>你覺得右側動作資料合乎左側影片中人物動作資料嗎？</p>
		        	<div class="pull-right" id="star">
		        	</div>
		        
		        </div>
		      </div><!-- /.modal-content -->
		    </div><!-- /.modal-dialog -->
		  </div><!-- /.modal -->
		';
	}else{
		//if users does not login in.
		if(!isLogin()){			
			$out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>抱歉!</h1>請先使用Google帳戶登入。</div></div>';
		}else{
			redirect('rate.php/list');
		}
	}
	require 'footer.php';


?>