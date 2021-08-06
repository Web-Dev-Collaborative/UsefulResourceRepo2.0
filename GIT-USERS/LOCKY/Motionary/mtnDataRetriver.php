<?php
  //this file is used to store motion data to server and retrieve motion data from .txt file
  $out['self'] = 'mtnDataRetriver';
  include "connectSql.php";
  require "header.php";

  if(!isLogin()){
    return;
  }

  if(isGET('store')){
      //get contributor's ip address and tranform into tag in float format.
      $ip	= (string)$_SERVER['REMOTE_ADDR'];
      $tag = sprintf('%u',ip2long($_SERVER['REMOTE_ADDR']));
      

      $mtnData = $_POST['mtnData'];//Skeleton data retrieved from kinect.
      $mail = $_SESSION['mail'];//contributor's e-mail address.

      //specify the .txt file name and the directory name where we want to save.
      $directory = './skeletonData/';
      $accountName = explode("@", $mail);
      $filename = $_POST['vid'].'_'.$accountName[0].'.txt';

      //save the information about this contribution. 
      if(!mysql_query("INSERT INTO motiondata (vid, fileName, owner , onickName, score) VALUES 
      ('".$_POST['vid']."', '".$filename."','".$_SESSION['mail']."','".$_SESSION['nickName']."',0)")){
        //failed to save to database.
        echo '{"status:" 0}';
      }

      //write to the file.
      $fp = fopen($directory.$filename, "a+");
      $write = fputs($fp, $mtnData);
      fclose($fp);

      //return the successfull msg to the client.
      echo '{"status": 1, "alphaid":"'.$_POST['vid'].'"}';
  }else if(isGET('retrieve')){
      $mid = $_POST['mid'];
      $result = mysql_query("SELECT * FROM motiondata WHERE mid=".$mid);
      $row = mysql_fetch_array($result);

      $video = mysql_fetch_array(searchVideoByID($row['vid']));

      $directory = './skeletonData/';
      $filename = $directory.$row['fileName'];
      
      $fp = fopen($filename, 'r'); // use 'rw' to open file in read/write mode

      // to output entire file
      $mtnStr = fread($fp, filesize($filename));
       // to close file
      fclose($fp);

      echo '{"status":1, "mtnArr":"'.$mtnStr.'", "contributor":"'.$row['onickName'].'", "start_time":'.$video['start'].', "end_time":'.$video['end'].', "youtubeID":"'.$video['ytoutubeID'].'"}';
  }

?>
