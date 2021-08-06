<?php
	$out['self'] = 'user';
	require 'header.php';
	include "connectSql.php";
	// require_once('lib/PhpConsole.php');
	// PhpConsole::start();
	
	$libray = '';

	
	if(isGET('info')){
		$tagData = mysql_fetch_array(mysql_query("SELECT * FROM tagData WHERE tagName='".$_POST['tag']."'"));
		
		if($tagData){
			$tid = $tagData['tid'];
			$vidArray = mysql_query("SELECT vid FROM tagMap WHERE tid='".$tid."'");
			$vids = array();
			$ytoutubeID = array();
			$requestTime = array();

			while($row = mysql_fetch_array($vidArray)){
				array_push($vids, alphaID((int)$row['vid'],false,7, 'KOvideo99623773in'));
				$videoData = mysql_query("SELECT * FROM videoData WHERE vid='".$row['vid']."'");
				$videaDataArray = mysql_fetch_array($videoData);
				array_push($ytoutubeID, $videaDataArray['ytoutubeID']);
				array_push($requestTime, $videaDataArray['requestTime']);
			}
			if(count($vids)==0){
				echo '{"status":2, "tag":"'.$_POST['tag'].'"}';
			}else
				echo '{"status":1, "identity":'.json_encode($vids).', "ytoutubeID":'.json_encode($ytoutubeID).', "requestTime":'.json_encode($requestTime).', "tag":"'.$_POST['tag'].'"}';

		}else{
			echo '{"status":2, "tag":"'.$_POST['tag'].'"}';
		}
	}else if(isGET('auto')){
		$aryPara = array(
			$_POST['term']
			// $this->input->post('term') //抓term(使用者所輸入的值)
		);
		$sql = "SELECT tagName FROM tadData WHERE tagName LIKE CONCAT(?, '%');";
		$result = mysql_query($sql, $aryPara);
		if($result->num_rows() > 0){       
			$data= array(); //一定要轉成有label及value的array

			foreach($result->result() as $row){
				$data[] = array('label'=> $row['tagName'], 'value'=> $row['tagName']);
			}
		}
		// echo json_encode($data);
		echo json_encode($aryPara);
		// echo "test\n";
	}else if(isGET('gettag')){

		//取得所有的tag資料
		$result = mysql_query("SELECT tagName FROM tagdata ORDER BY tagName");
		$tagArr = array();
		while($row = mysql_fetch_array($result)){
			array_push($tagArr, $row['tagName']);
		}
		echo '{"status":1,"tagArr":'.json_encode($tagArr).'}';

	}else{
		echo '{"status":0, "tag":"'.$_POST['tag'].'"}';
	}
?>