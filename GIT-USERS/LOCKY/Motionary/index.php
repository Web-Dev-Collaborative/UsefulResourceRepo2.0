<?php

$out['self'] = 'index';
require 'header.php';

$out['content'] = '
		<div class="jumbotron">
			<h1>歡迎!Motionary動作字典!</h1>
			<h2>本網站提供了可將影片轉換為3D模型的創新服務</h2>
			<p>powered by <a href="http://zigfu.com/" target="_blank">Zigfu</a></p>
			<p>
				<a class="btn btn-primary btn-lg">
					<span class="glyphicon glyphicon-ok"></span>即刻嘗試
				</a>
			</p>
		</div>';

require 'footer.php';

?>
