<?php
	$out['self'] = 'user';
	require 'header.php';
	include "connectSql.php";

	$libray = '<script type="text/javascript" src="/kinect/js/request.js"></script>
  <script src="/kinect/js/lib/tag-it.min.js" type="text/javascript" charset="utf-8"></script>
  <script type="text/javascript" src="/kinect/js/rat-lib/jquery.raty.js"></script>
  <link href="/kinect/css/jquery.tagit.css" rel="stylesheet" type="text/css">
  <link href="/kinect/css/tagit.ui-zendesk.css" rel="stylesheet" type="text/css">
	';

	if(!isLogin()){
			$out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>Error!</h1>Please Login in first to enjoy our service.</div></div>';
	}else{
		$out['content'] = $libray.'
		<div class="row">
		<div class="col-lg-2">
		<div class="list-group">
		<a href="/kinect/user.php/info" class="list-group-item">
		基本資料
		</a>
		<a href="/kinect/user.php/vid" class="list-group-item">任務清單</a>
		<a href="/kinect/user.php/contribute" class="list-group-item">貢獻清單</a>
		</div>
		</div>
		';
	}


	if(isGET('info')&&isLogin()){
		$result = mysql_fetch_array(searchUserBymail($_SESSION['mail']));
		$out['content'] .= '
		 <div class="col-lg-6">
			<div class="well well-sm">
					<form class="form-horizontal" id="form-user-update" role="form">
					<div class="form-group">
					<label class="col-lg-2 control-label">Email</label>
					<div class="col-lg-10">
					<input type="text" class="form-control" id="disabledInput" placeholder="'.$result['email'].'" disabled>
					</div>
					</div>
					<div class="form-group">
					<label for="lastName" class="col-lg-2 control-label">姓</label>
					<div class="col-lg-10">
					<input type="text" name="lastName"  class="form-control" placeholder="'.$result['lastName'].'" disabled>
					</div>
					</div>
					<div class="form-group">
					<label for="firstName" class="col-lg-2 control-label">名</label>
					<div class="col-lg-10">
					<input type="text" name="firstName"  class="form-control" placeholder="'.$result['firstName'].'" disabled>
					</div>
					</div>
					<div class="form-group">
					<label for="nickName" class="col-lg-2 control-label">暱稱</label>
					<div class="col-lg-10">
					<input type="text" name="nickName" class="form-control" value="'.$result['nickName'].'">
					</div>
					</div>
					<button id="btn-upd-user" type="submit" class="btn btn-primary">更新個人資訊</button>

					</form>
			</div>
		 </div>
		 <div class="col-lg-4">
		 	<div class="well well-sm">
		 		'.$result['nickName'].',你的賬戶一共有<strong>'.$result['coin'].'</strong>金幣
		 	</div> 
		 </div>
		</div>
		';
	}else if(isGET('vid')&&isLogin()){
		$out['content'] .= '
		 <div class="col-lg-7">
			'.listUserVideo().'
		</div>
		</div>
		';

	}else if(isGET('contribute')&&isLogin()){
		$listUserMotion = listUserMotion($_SESSION['mail']);
		$out['content'] .= '
		 <div class="col-lg-7">
			'.$listUserMotion['htmlFrag'].'
		</div>
		</div>
		';

	}else if(isLogin()){
		redirect('user.php/info');
	}
	require 'footer.php';


?>