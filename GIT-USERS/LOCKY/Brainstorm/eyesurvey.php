<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);
include "connect.php";
include "comment.class.php";
$uri = $_SERVER['REQUEST_URI'];
$uri = str_replace(".", "", str_replace("/", "", str_replace("php", "", $uri)));
$tag    = sprintf('%u',ip2long($_SERVER['REMOTE_ADDR']));

// $ipCheck = mysql_query("SELECT 1 FROM ".$uri." WHERE tag = ".$tag);
// if($ipCheck)
//   $rows = mysql_num_rows($ipCheck);
// else{
//   $rows = 0;
// }
// if($rows){
//   //header('Location: /demo/error.php');
// }

if(!isset($_GET['o'])||!isset($_GET['t'])||!isset($_GET['r']))  
  header('Location: /brainstorm/index.php');

header ( "Expires: Mon, 26 Jul 1997 05:00:00 GMT" );
header ( "Last-Modified: " . gmdate ( "D, d M Y H:i:s" ) . " GMT" );
header ( "Cache-Control: no-store, no-cache, must-revalidate" );
header ( "Cache-Control: post-check=0, pre-check=0", false );
header ( "Pragma: no-cache" );
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>The “Extra Eye” Brainstorming Task</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
  <script src="countdown.js" type="text/javascript" charset="utf-8"></script>
  <script type="text/javascript" src="script.js" charset="utf-8"></script>

  <style type="text/css">
  br { clear: both; }
  .cntSeparator {
    font-size: 54px;
    margin: 10px 7px;
    color: #000;
  }
  .desc { margin: 7px 3px; }
  .desc div {
    float: left;
    font-family: Arial;
    width: 70px;
    margin-right: 65px;
    font-size: 13px;
    font-weight: bold;
    color: #000;
  }
  </style>
</head>

<body>

  <div class="timestamp">
    <?php
          session_start();
          if(isset($_SESSION['eye'])){
            if($_SESSION['eye']==-1){
              echo '0';
            }else
              echo $_SESSION['eye']-time();
          }else{
            $_SESSION['eye'] = time()+10*60;
            echo $_SESSION['eye']-time();
          }
    ?>
  </div>
  <div id="wrapper">
    <div id="addCommentContainer">
      <h2 class="task-title">“Extra Eye” Working Area</h2>
      <hr/>
      <div >
        <h3><span class="countdown"></span></h3> 

        What practical benefits or difficulties will arise when people
        start having this extra eye? <br/><br/>
        <?php
        if($_GET['r']==0){
          echo "Please focus on how will the SOCIETY benefit when people have this extra eye?.";
        }else if($_GET['r']==1){
          echo "Please focus on how will individuals benefit when people have this extra eye?.";
        }
        
        ?>
        <br/>
        <div class="conlumn"><img src="img/extra-eye.png"></div>
        <div class="conlumn ideaCon"><div class="ideas style8">
            <span id="ideaIndicator" style="font-size:12px;">Your ideas are displayed here:<span>
        </div> </div>

        <br/>
        <span for="idea">Please type in your ideas</span>
        
        <div class="inputs">

        </div>
        <button class="submit"id="enterBtn">Enter</button>
        
        <div style="width:180px; margin: 160px auto;">
          <button class="submit" id="exitBtn">Finish Brainstorming Early</button>
        </div>
        

          
        <input type="hidden" id="URI" name="URI" value="<?php echo $_SERVER['REQUEST_URI'];?>">
        <input type="hidden" id="o" name="o" value="<?php echo $_GET['o'];?>">
        <input type="hidden" id="r" name="r" value="<?php echo $_GET['r'];?>">
        <input type="hidden" id="t" name="t" value="<?php echo $_GET['t'];?>">


      </div>


    </div>
  </div>

<div class="footer">
    BrainStorm Task Survey 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
    <?php
      if(!isset($_SESSION['eyefinished'])){ 
        $_SESSION['eyefinished'] = 1;
        $_SESSION['eyet'] = time() - $_SESSION['eyet'];
      }
      echo "<br/>You spent ".$_SESSION['eyet']."s on eye.php.";
    ?>

</div>  
</body>
</html>
