<?php
	$out['self'] = 'dataCenter';	
	require 'header.php';
	include "connectSql.php";
	require_once('lib/PhpConsole.php');
	PhpConsole::start();
	
	$errors = array();
	$arrs = array();

	if(isGET('upduser')&&isLogin()){
		$arr = array(
			'nickName' => filter_input(INPUT_POST,'nickName',FILTER_CALLBACK,array('options'=>'validate_text')),
			'budget' => filter_input(INPUT_POST,'budget',FILTER_CALLBACK,array('options'=>'validate_text'))
		);
		updateUserBymail($_SESSION['mail'], $arr);
		echo '{"status":1}';
	}else if(isGET('updrqst')&&isLogin()){

		$arr = array(
			'addTime' => filter_input(INPUT_POST,'unixtime',FILTER_CALLBACK,array('options'=>'validate_text'))+
				filter_input(INPUT_POST,'MoreTimeNeeded',FILTER_CALLBACK,array('options'=>'validate_text'))*24*60*60,
			'budget' => filter_input(INPUT_POST,'budget',FILTER_CALLBACK,array('options'=>'validate_text')),
			'identity' => filter_input(INPUT_POST,'identity',FILTER_CALLBACK,array('options'=>'validate_text'))
		);
		updateRequest($arr);
		echo '{"status":1,"identity":"'.$arr['identity'].'"}';
	}else if(isGET('reqvid')&&isLogin()){
		$user = mysql_fetch_array(searchUserBymail($_SESSION['mail']));

		if(! ($arrs['ytoutubeID'] = filter_input(INPUT_POST,'vid',FILTER_CALLBACK,array('options'=>'validate_text')))){
			$errors['vid'] = 'Please specify the video ID';
		}

		if(! ($arrs['tag'] = filter_input(INPUT_POST,'tag',FILTER_CALLBACK,array('options'=>'validate_text')))){
			$errors['tag'] = 'Please help us tag at least one motion';
		}

		if(!($arrs['budget'] = filter_input(INPUT_POST,'budget',FILTER_CALLBACK,array('options'=>'validate_text')))){
			$errors['budget'] = 'Please specify the budget';
		}else{
			if($arrs['budget']>$user['coin'])
				$errors['budget'] = 'Sorry, you don\'t have enough money.';
		}

		if(! ($arrs['start'] = filter_input(INPUT_POST,'start_value',FILTER_CALLBACK,array('options'=>'validate_text')))){
			$errors['period'] = 'Please specify the period';
		}

		if(! ($arrs['end'] = filter_input(INPUT_POST,'end_value',FILTER_CALLBACK,array('options'=>'validate_text')))){
			$errors['period'] = 'Please specify the period';
		}


		if(!empty($errors)){
			echo '{"status":0, "errors":'.json_encode($errors).'}';
		}else{
			//This block will process the datas we get and store into the database.
			$arrs['owner'] = $_SESSION['mail'];
			$arrs['ip'] = (string)$_SERVER['REMOTE_ADDR'];
			$arrs['deadline'] = (filter_input(INPUT_POST,'TimeNeeded',FILTER_CALLBACK,array('options'=>'validate_text'))*24*60*60)+time();
			$arrs['descrip'] = filter_input(INPUT_POST,'descrip',FILTER_CALLBACK,array('options'=>'validate_text'));
			
			$alphaid = insertVideo($arrs);
			
			echo '{"status":1, "alphaid":"'.$alphaid.'"}'; // return successful msg to the client.
		}

	}else if(isGET('rate')&&isLogin()){

		$user = mysql_fetch_array(searchUserBymail($_SESSION['mail']));
		if(!mysql_num_rows(mysql_query("SELECT * FROM scoremap WHERE uid = ".$user['uid']." AND mid = ".$_POST['mid']))){
			$motion = mysql_fetch_array(mysql_query("SELECT * FROM motiondata WHERE mid = ".$_POST['mid']));
			if($_SESSION['mail']==$motion['owner']){
				echo '{"status":2, "mid":'.$_POST['mid'].'}';
				return;
			}
			$score = $motion['score'];
			$scoreCnt = $motion['scoreCnt'];

			$total = ($score*$scoreCnt)+$_POST['scores'];

			mysql_query("UPDATE motiondata SET score = ".$total.", scoreCnt = ".($scoreCnt+1)." WHERE mid = ".$_POST['mid']);
			mysql_query("INSERT INTO scoremap (uid, mid, score) VALUES
			(".$user['uid'].",".$_POST['mid'].", ".$_POST['scores'].")
			");
			echo '{"status":1, "mid":'.$scoreCnt.'}';
		}else{
			echo '{"status":0, "mid":'.$_POST['mid'].'}';
		}
		//mysql_query("INSERT INTO scoremap (uid, mid, score) VALUES ()");

	}else if(isGET('deletev')&&isAdmin()){
		mysql_query("DELETE FROM videodata WHERE identity='".$_POST['alphaid']."'");
		mysql_query("DELETE FROM tagmap WHERE vid=".alphaID($_POST['alphaid'],true,7, 'KOvideo99623773in'));
		mysql_query("DELETE FROM motiondata WHERE vid='".$_POST['alphaid']."'");

		echo '{"status":1}';
	}else{
		echo '{"status":2}';		
	}
?>