<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);
include "connect.php";
include "comment.class.php";
// header ( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
// header ( "Last-Modified: " . gmdate ( "D, d M Y H:i:s" ) . " GMT" );
// header ( "Cache-Control: no-store, no-cache, must-revalidate" );
// header ( "Cache-Control: post-check=0, pre-check=0", false );
// header ( "Pragma: no-cache" );
if(!isset($_GET['c']))  
  header('Location: /brainstorm/index.php');
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Brainstorming Procedure Instruction</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
</head>

<body>
  <div id="wrapper">
    <div class="style8 question_start">
      <h2>Brainstorming Procedure Instruction</h2>
      <hr/>
      <div class="demo-div">

        <div>
         Fill in the Brainstorming Procedure.
       </div>
     </div>
     <hr/>
     <p>
       <h2>Please cilck the link below to start the survey</h2>
     </p>
     <h2>
      <?php
      $task = array("eye","thumb");
      $ran = rand(0,1);
      $t = "$ran";
      $ran = rand(0,1);
      $r = "$ran";
      $ran = rand(0,1);
      $o = 0;
      echo "<a  class='nextLink' href='".$task[$t].".php?o=".$o."&r=".$r."&c=".$_GET['c']."&t=".$t."'>NEXT</a>"
      ?>
    </h2>
  </div>
</div>
<div class="footer">
    BrainStorm Task Survey 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
</div>  
</body>
</html>
