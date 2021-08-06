<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <title>Survey</title>
  <link rel="stylesheet" type="text/css" href="styles.css" />
  <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
  <script type="text/javascript" src="script.js"></script>
  <link type='text/css' href="bootstrap.min.css" rel="stylesheet" media="screen">
</head>

<body>
  <div id="wrapperOfAddComment">

      <div id="addCommentContainer" class="style8 question_start">
        <h2 class="task-title">Questionnaire</h2>
       <form id="addCommentFormEnd" method="post" action="">
         <div>
           <label for="gender">1. Gender: </label>
              <div class="radio">
                <label>
                  <input type="radio" name="q1" value="Male">
                    Male
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q1" value="Female">
                  Female
                </label>
              </div>
              <div class="radio" style="position:relative;">
                <label>
                  <input type="radio" name="q1" value="Other" style="position:absolute;top:16%;">
                     Other (please specify):
                  <input type="text" name="gender-other" id="gender-other" />
                </label>
              </div>

          
          <br><label for="education">2. Education. what is the highest level of school you have completed or the highest degree you have received? </label>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="1">
                    Less than high school degree
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="2">
                     High school degree or equivalent (e.g., GED)
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="3">
                     Some college but no degree
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="4">
                     Associate degree
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="5">
                     Bachelor degree
                </label>
              </div>
              <div class="radio">
                <label>
                  <input type="radio" name="q2" value="6">
                     Graduate degree
                </label>
              </div>


           <br><label for="age">3. Age: </label>
           <input type="text" name="age" id="age" />

           <br><br><label for="language">4. What is your native language: </label>
           <input type="text" name="language" id="language" />
      
           <br><br><label for="residency">5. Country of residency: </label>
           <input type="text" name="residency" id="residency" />

           <br><br><label for="citizenship">6. Citizenship: </label>
           <input type="text" name="citizenship" id="citizenship" />
           
           <br><br><label for="ethnicity">7. Ethnicity: </label>
           <div class="radio">
                <label>
                  <input type="radio" name="q7" value="1">
                    American Indian or Alaskan Native
                </label>
            </div>
            <div class="radio">
                <label>
                  <input type="radio" name="q7" value="2">
                    Asian
                </label>
            </div>
            <div class="radio">
                <label>
                  <input type="radio" name="q7" value="3">
                     Black or African-American
                </label>
            </div>
            <div class="radio">
                <label>
                  <input type="radio" name="q7" value="4">
                    Native Hawaiian or Other Pacific Islander
                </label>
            </div>
            <div class="radio">
                <label>
                  <input type="radio" name="q7" value="5">
                    White or Caucasian
                </label>
            </div>
            <div class="radio">
                <label>
                  <input type="radio" name="q7" value="6">
                    Hispanic or Latino
                </label>
            </div>
            <div class="radio" style="position:relative;">
                <label>
                  <input type="radio" name="q7" value="7" style="position:absolute;top:16%;">
                    Other (please specify):
                  <input type="text" name="ethnicity-other" id="ethnicity-other" />
                </label>
            </div><br>

           <input type="hidden" id="o" name="o" value="<?php echo $_GET['o'];?>">
           <input type="hidden" name="URI" value="<?php echo $_SERVER['REQUEST_URI'];?>">
           <input type="submit" class="submit" value="Submit" />
         </div>
       </form>
     </div>

 </div>
 <div class="footer">
    Brainstorming study 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
</div> 

</body>
</html>