<?php
	$out['self'] = 'video';	
	require 'header.php';
	include "connectSql.php";
	
	require_once('lib/PhpConsole.php');
	
	PhpConsole::start();


	if(isGET('list')){
		$out['content'] = listAllVideo($_GET['list']);
	}
	else if(isGET('dtls')&&isLogin()){
		
		//show video details (video.php/dtls/videoID)

		$alphaid = $_GET['dtls'];
		$editBtnHTML = ''; $deleteBtn = '';
		//include the libraries we need for this page.

		$library = '<script type="text/javascript" src="/kinect/js/video.js"></script>
		<script type="text/javascript" src="/kinect/js/Three.js"></script>
		<script type="text/javascript" src="/kinect/js/rat-lib/jquery.raty.js"></script>';

		//Get video details from database with sql.
		$result = mysql_fetch_array(searchVideoByID($alphaid));
		foreach ($result as $key => $value) {
			$$key = $value;
		}
		if($descrip==''){
			$descrip = '無特別敘述';
		}

		$userResult = mysql_fetch_array(searchUserBymail($owner));


		//設定到期時間與request時間
		$unixTime = $deadline;
		$deadDate = new DateTime("@$unixTime");
		if(time()<$unixTime){

			$remainDays = '剩下'.floor(($unixTime - time())/(24*60*60)).'天';
			$deadDate = $deadDate->format('Y-m-d H:i:s');

		}else{
			$remainDays = '已經截止!';
			$deadDate = 'pasted';
		}
		//create the timeago 
		$reqTimeTexts = 'Requested by '.$userResult['nickName'].' @ <abbr class="timeago" title="'.intoISOTimestamp($requestTime).'"></abbr>';

		//取得youtube影片名稱
		// $content = file_get_contents("http://youtube.com/get_video_info?video_id=".$ytoutubeID);
		// parse_str($content, $ytarr);
		// debug($ytarr['title']);

		//output html content.

		//listAllMotion is defined in the video.lib.php
		$listAllMotion = listAllMotion($alphaid);

		//是否顯示刪除鍵
		if(isAdmin()){
			$deleteBtnHTML = '
			<span id="deleteBtn" class="glyphicon glyphicon-trash" style="cursor:pointer;"></span>
			';
		}
		//是否顯示編輯鍵
		if($_SESSION['mail']==$owner && time()<$unixTime){
			$editBtnHTML = '
			<a class="btn btn-warning btn-lg btn-block" href="/kinect/video.php/edit/'.$alphaid.'"><span class="glyphicon glyphicon-pencil"></span>編輯任務</a>
			';
		}

		$out['content'] = $library.'
		<div class="panel panel-default col-lg-8 col-lg-offset-2">
			<div class="row">
				<span id="alphaid" style="display:none">'.$alphaid.'</span>
				<div class="panel-body col-lg-5">
					
					<div id="video_sec">
						<img class="img-thumbnail" src="http://img.youtube.com/vi/'.$result['ytoutubeID'].'/0.jpg" style="width:300px;">
					</div>
					<button class="btn btn-success btn-lg btn-block disabled" id="play-video-btn"><span class="glyphicon glyphicon-arrow-up"></span> 從'.gmdate("H:i:s", $start).'播放到'.gmdate("H:i:s", $end).'</button>
					'.$editBtnHTML.'
				</div>
				<div class="panel-body col-lg-7">
					<div class="panel panel-info">
						<div class="panel-heading">
							<h3 class="panel-title">任務資訊'.$deleteBtnHTML.'</h3>
						</div>
						<div class="panel-body">
							<h5>Youtube\'s ID: </h5><a id="ytoutubeID" href="http://youtu.be/'.$ytoutubeID.'" target=_blank>'
							.$ytoutubeID.'</a><br/>
							<h5>影片敘述: </h5>
							<span>'.$descrip.'</span>
							<h5>任務區間:(時:分:秒)</h5>
							從 <span>'.gmdate("H:i:s", $start).'</span> 到 <span>'.gmdate("H:i:s", $end).'</span>. (<span>一共 '.($end-$start).'</span> 秒)
							<span id="start-time" style="display:none;">'.$start.'</span><span id="end-time"  style="display:none;">'.$end.'</span>
							<h5>截止時間: </h5><span class="label label-danger" title="Deadline is '.$deadDate.'">'.$remainDays.'</span><br/>
							<h5>預算: </h5><a id="coins" data-toggle="tooltip" data-placement="right" title="貢獻您的動作來賺金幣吧!">'.$budget.'個金幣</a><br/>
							<h5>動作標籤: </h5>'.generateTagLink($tag).'<br/><br/>'.$reqTimeTexts.'
						</div>
					</div>
				</div>
			</div>';
		
		if(!$listAllMotion['hasContribute'] && time()<$unixTime){

			$out['content'] .= '
				<a class="btn btn-primary btn-lg btn-block" href="/kinect/application.php/act/'.$alphaid.'">馬上使用Kinect貢獻你的動作資料!</a>
			';
		}else{
			$outputText = '';
			if(time()>$unixTime){
				$outputText = '抱歉，任務截止時間已到。';
			}else{
				$outputText = '感謝你的貢獻:-)';
			}
			$out['content'] .= '<button class="btn btn-primary btn-lg btn-block disabled">'.$outputText.'</button>';
		}
		
		
		
		//list the motion
		$out['content'] .= '
		<div class="row">
			<div class="panel-body">
				'.$listAllMotion['htmlFrag'].'
			</div>
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
	}else if(isGET('edit')&&isLogin()){
		
		$library = '<script type="text/javascript" src="/kinect/js/request.js"></script>
		<script src="/kinect/js/lib/tag-it.min.js" type="text/javascript" charset="utf-8"></script>
  		<link href="/kinect/css/jquery.tagit.css" rel="stylesheet" type="text/css">
  		<link href="/kinect/css/tagit.ui-zendesk.css" rel="stylesheet" type="text/css">';

		$alphaid = $_GET['edit'];
		
		//Get video details
		$result = mysql_fetch_array(searchVideoByID($alphaid));
		foreach ($result as $key => $value) {
			$$key = $value;
		}

		if($_SESSION['mail']!=$owner){
			$out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>抱歉!</h1>這不是你發佈的任務.</div></div>';
		}else{
			//get owner's informations
			$userResult = mysql_fetch_array(searchUserBymail($owner));


			//operate the video data.

			$unixTime = $deadline;
			//transform the deadline into unix timestamp format.
			$deadDate = new DateTime("@$unixTime");
			
			//check whether time is up.

			if(time()<$unixTime){
				$deadDate = $deadDate->format('Y-m-d H:i:s');
			}else{
				$deadDate = '<b style="color:red;">已經截止!</b>';
			}
			
			//create the timeago innnerHTML Text
			$reqTimeTexts = 'Requested by '.$userResult['nickName'].' @ <abbr class="timeago" title="'.intoISOTimestamp($requestTime).'"></abbr>';

			//output html content.
			$out['content'] = $library.'
			<div class="panel panel-default col-lg-8 col-lg-offset-2">
			<div class="row">
				<div class="panel-body col-lg-5">
					<div>
						<img class="img-thumbnail" src="http://img.youtube.com/vi/'.$result['ytoutubeID'].'/0.jpg" style="width:300px;">
					</div>
				</div>
				<div class="panel-body col-lg-7">
				<div class="panel panel-info">
				<div class="panel-heading">
				<h3 class="panel-title">任務資訊</h3>
				</div>
				<div class="panel-body">
					<form class="form-horizontal" id="form-request-update" role="form">
						<div class="form-group">
						<label class="col-lg-2 control-label">影片ID:</label>
						<div class="col-lg-10">
						<input type="text" class="form-control" id="disabledInput" placeholder="'.$ytoutubeID.'" disabled>
						<a id="ytoutubeID" href="http://youtu.be/'.$ytoutubeID.'" target=_blank style="display:none;">'.$ytoutubeID.'</a>
						</div>
						</div>
						<div class="form-group">
						<label for="period" class="col-lg-2 control-label">任務區間:</label>
						<div class="col-lg-10">
						<input type="text" class="form-control" placeholder="Start from '.$start.'s to '.$end.'s. ('.($end-$start).' seconds)" disabled>
						</div>
						</div>

						<div class="form-group">
						<label for="deadline" class="col-lg-2 control-label">截止時間:</label>
						<div class="col-lg-10">
						<input type="text" name="deadline"  class="form-control" value="'.$deadDate.'" disabled>
						</div>
						</div>

						<div class="form-group">
						<label for="budget" class="col-lg-2 control-label">預算:</label>
						<div class="col-lg-10">
						<input type="text" name="deadline"  class="form-control" value="'.$budget.'" disabled>
						</div>
						</div>

						<div class="form-group">
							<div class="input-group col-lg-12">
								<span class="input-group-addon">我需要加上</span>
								<select name="MoreTimeNeeded" class="form-control">
									<option>0</option>
									<option>1</option>
									<option>2</option>
									<option>3</option>
									<option>4</option>
									<option>5</option>
								</select>                  
								<span class="input-group-addon">天的時間來收集資料。</span>
							</div>
						</div>

						<div class="form-group">
							<div class="input-group col-lg-12">								
								<span class="input-group-addon">增加</span>
								<input type="text" name="budget" class="form-control" value="0">
								<span class="input-group-addon">金幣到預算之中。</span>

							</div>	
						</div>
						<input type="text" name="identity" class="form-control" style="display:none;" value="'.$alphaid.'">
						<input type="text" name="unixtime" class="form-control" style="display:none;" value="'.$unixTime.'">

						<div class="form-group">
						<label for="tag" class="col-lg-2 control-label">動作標籤:</label><br/><br/>
						<input name="tags" id="mySingleField" value="'.$tag.'" disabled="true" style="display:none;">
                  		<ul id="singleFieldTags"></ul>
						</div>
						<button id="btn-upd-request" type="submit" class="btn btn-primary">完成修改</button>
					</form>
					
					<!--<h5>Youtube\'s ID: </h5><a id="ytoutubeID" href="http://youtu.be/'.$ytoutubeID.'" target=_blank>'
					.$ytoutubeID.'</a><br/>
					<h5>Period:</h5>
					Start from '.$start.'s to '.$end.'s. ('.($end-$start).' seconds)
					<h5>Deadline: </h5>'.$deadDate.'<br/>
					<h5>Budget: </h5>'.$budget.'(NTD)<br/>
					<h5>Tag(s): </h5>'.generateTagLink($tag).'<br/><br/>'.$reqTimeTexts.'-->
				</div>
				</div>
					
				</div>
			</div></div>';
		}
		

		
	// }else if(isGET('edit')&&isLogin()&&$_SESSION['mail']!=$owner){
		// $out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>Error!</h1>This is not your video.</div></div>';
	}else{
		//if users does not login in.
		if(!isLogin()){			
			$out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>抱歉</h1>請先使用Google帳戶登入。</div></div>';
		}else{
			redirect('video.php/list');
		}
	}
	require 'footer.php';


?>