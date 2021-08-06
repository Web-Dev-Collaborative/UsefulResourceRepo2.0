<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Survey</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script type="text/javascript" src="script.js"></script>
  <script src="bootstrap.min.js"></script>

  <link type='text/css' href="bootstrap.min.css" rel="stylesheet" media="screen">
</head>

<body>
  <div id="wrapperOfAddComment">

      <div id="addCommentContainer" class="style8 question_start">
        <h2 class="task-title">Questionnaire</h2>
       <form id="addCommentFormEnd" method="post" action="">
        <table class="table">
          <tbody>
            <tr>
              <h4>Part 1</h4>
            </tr> 
            <tr>
             <label for="q1">
             (1) ONE key differences between the two tasks is that you were asked to brainstorm about how the change will benefit individuals in one task, and the society in the other:                       
             </label>  
              <div class="radio">
                <label>
                  <input type="radio" name="q1" value="True">
                    True
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q1" value="False">
                  False
                </label>
              </div>        
            </tr>
            <br><br>
            <tr>
              <label for="q2">
              (2) What's the reward for creative ideas that you generated? 
              </label>                      
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="1">
                  None
                </label>
              </div>
              <div class="radio" style="position:relative;">
                <label>
                  <input type="radio" name="q2" value="2" style="position:absolute;top:16%;">
                  Other (please specify):
                  <input type="text" name="reward" class="form-control">
                </label>
              </div>
            </tr>

          </tbody>
        </table>
         <div>
           <input type="hidden" id="o" name="o" value="<?php echo $_GET['o'];?>">
           <input type="hidden" name="URI" value="<?php echo $_SERVER['REQUEST_URI'];?>">
           <input type="submit" class="submit" value="NEXT" />
         </div>
       
       </form>
     </div>

 </div>
 <div class="footer">
  Brainstorming study 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
</div> 

</body>
</html>