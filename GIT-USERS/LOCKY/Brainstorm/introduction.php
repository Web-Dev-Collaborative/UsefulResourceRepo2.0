<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>About This Brainstorming Study</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
</head>

<body>
  <div id="wrapper">
    <div class="style8 question_start">
      <h2>Study Instruction</h2>
      <hr/>
      <div class="main-div">
        <p>
        In this study, you're asked to participate in two brainstorming tasks. For each task, you are placed in a hypothetical situation, and you are given 10 minutes to generate as many creative solutions as you can. 
        At the end of the study, you'll be asked to answer some background questions about yourself. The whole study should take about 30 minutes to complete.<br/><br/>
      </p>
        <p>
        <b> 
         <?php
          session_start();
          if($_SESSION['c']==0){  
            echo ""; //none incentives            
          }else if($_SESSION['c']==1){
            echo "To encourage more creative ideas, we will pay those who can come up with ideas that others did not. 
            Specifically, for each rare idea that you generate, you will receive $0.50. A rare idea is one that less than 5% of our study participants have generated. If you generate 4 rare ideas, you will earn an additional $2.00. <br/><br/><img src='http://www.caribexams.org/files/files/pay-money.jpg'>";
          }else if($_SESSION['c']==2){
              echo "To encourage more creative ideas, we will make a donation contribution on your behalf to the ";
              echo "American Red Cross Society";
              echo ", which is a humanitarian organization that provides emergency assistance, 
              disaster relief and education inside ";
              echo "the United States";
              echo "<br><br>Specifically, for each rare idea that you generate, we will donate $0.50. A rare idea is one that less than 5% of our study participants have generated. If you generate 4 rare ideas, you will donate $2.00. <br/>
              <br/>";
              echo "<img src='http://www.redcross.org/images/MEDIA_CustomProductCatalog/m6340297_514x260-logo.jpg' width=400>";
          }
          else if($_SESSION['c']==3){
              echo "To encourage more creative ideas, we will make a donation contribution on your behalf to the ";              
              echo "Indian Red Cross Society";
              echo ", which is a humanitarian organization that provides emergency assistance, 
              disaster relief and education inside ";
              echo "India";
              echo "<br><br>Specifically, for each rare idea that you generate, we will donate $0.50. A rare idea is one that less than 5% of our study participants have generated. If you generate 4 rare ideas, you will donate $2.00. <br/>
              <br/>";
              echo "<img src='http://nellore.nic.in/images/REDCROSS%20LOGO.jpg' width=400>";
          }
          ?>
        </b>
      </p>
      </div>    
      <hr/>
     

      <h2>
        <?php
            session_start();
            $task = array("eye","thumb");
            
            if(!isset($_SESSION['t'])){
              $ran = rand(0,1);
              $_SESSION['t'] = $ran;
            }

            if(!isset($_SESSION['r'])){
              $ran = rand(0,1);
              $_SESSION['r'] = $ran;
            }


            $ran = rand(0,1);
            $o = 0;
            echo "<a  class='nextLink submit' href='".$task[$_SESSION['t']].".php?o=".$o."&r=".$_SESSION['r']."&t=".$_SESSION['t']."'>NEXT</a>"
        ?>
      </h2>
    </div>
  </div>
  <div class="footer">
    BrainStorm Task Survey 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
    
    <?php
      if(!isset($_SESSION['introduction'])){
        $_SESSION['introduction'] = time();
        $_SESSION['index'] = $_SESSION['introduction'] - $_SESSION['index'];
      }
      echo "<br/>You spent ".$_SESSION['index']."s on index.php.";
    ?>

  </div>  
</body>
</html>
