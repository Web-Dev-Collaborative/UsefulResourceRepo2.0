<?php

$out['self'] = 'request';

require 'header.php';
include "connectSql.php";

$library = '
  <script type="text/javascript" src="/kinect/js/request.js"></script>
  <script src="/kinect/js/lib/tag-it.min.js" type="text/javascript" charset="utf-8"></script>
  <link href="/kinect/css/jquery.tagit.css" rel="stylesheet" type="text/css">
  <link href="/kinect/css/tagit.ui-zendesk.css" rel="stylesheet" type="text/css">';

if(isGET('do')){
  if(!isLogin()){
    $out['content'] = '<div class="panel panel-default col-lg-6 col-lg-offset-3" style="text-align:center;"><div class="panel-body"><h1>Oops!</h1>請先用google帳號登入我們的服務。</div></div>';
  }else{
        	$out['content'] = $library.'
        		<div class="row">
        <div class="col-lg-4 video_container">
          <div id="video_sec">
            <img src="http://www.underconsideration.com/brandnew/archives/youtube_logo_detail.png" class="img-thumbnail" style="width:350px;
            -webkit-filter: grayscale(100%);
       -moz-filter: grayscale(100%);
         -o-filter: grayscale(100%);
        -ms-filter: grayscale(100%);
            filter: grayscale(100%); ">
        </div>
        <br/><br/>
        <div id="slider-range">
        </div>
      </div>
        <div class="col-lg-5">
          <form id="form-request-video">
            <fieldset>
              <legend>建立影片動作資訊</legend>
              <div class="form-group">
              <label for="vid">你的影片</label>
              <div class="input-group">
                <span class="input-group-addon">http://www.youtube.com/watch?v=</span>
                <input type="text" name="vid" class="form-control" id="videoInput" placeholder="ID">
              </div>
              </div>
              <div class="form-group">
                  <label for="period">資料區間</label>
                <div class="input-group">
                  <span class="input-group-addon">從</span>
                  <input type="text" name="start" id="start_input" class="form-control">
                  <input type="hidden" name="start_value" id="start_input_value" class="form-control">
                  <span class="input-group-addon">到</span>
                  <input type="text" name="end" id="end_input" class="form-control">
                  <input type="hidden" name="end_value" id="end_input_value" class="form-control">

                </div>
              </div>
              <div class="form-group">
                <label for="TimeNeeded">任務執行時間</label>
                <div class="input-group">
                  <span class="input-group-addon">我需要</span>
                  <select name="TimeNeeded" class="form-control">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>                  
                  <span class="input-group-addon">天</span>
                </div>
              </div>

              <div class="form-group">
                <label for="budget">預算</label>
                  <input type="text" name="budget" class="form-control" id="budgetInput" placeholder="40">
              </div>
              <div class="form-group">
                <label for="descrip">任務敘述(不必要)</label>
                  <textarea type="text" name="descrip" class="form-control" id="desInput" placeholder="請於多人影片中, 指定您想要轉換動作的目標人物!"></textarea>
              </div>
              <div class="form-group">
                <label for="tag">動作標籤</label>
                  <input name="tags" id="mySingleField" value="" disabled="true" style="display:none;">
                  <ul id="singleFieldTags"></ul>
              </div>
              <button type="submit" id="btn-request-vid" class="btn btn-default">完成</button>
            </fieldset>
          </form>

        </div>
        <div class="col-lg-3">
          <div class="alert alert-info">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <h4>Some sugar!</h4>
            <p>...</p>
          </div>
        </div>
    </div>';
  }
}else{
	redirect('request.php/do');
}
require 'footer.php';

?>
