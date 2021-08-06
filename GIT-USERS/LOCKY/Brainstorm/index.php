<?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);
require_once('PhpConsole.php');
PhpConsole::start();

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
	<title>The Brainstorming Task</title>
	<link rel="stylesheet" type="text/css" href="styles.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="script.js" charset="utf-8"></script>

</head>

<body>
	<div id="wrapper">
		<div class="style8 question_start">
			<h2>Brainstorming Study Consent Form</h2>
			<hr/>
			<div class="demo-div">
				This is a consent form.(content to fill in.)<br/>
			</div>
			<hr/>
			<h2 id="submit-container">
				<?php
					    session_start();
						$ran = rand(0,3);
						$_SESSION['c'] = $ran;
						echo "<button class='nextLink submit'>I agreed the terms and conditions.</button>"
				?>
			</h2>
		</div>
	</div>

	<div class="footer">
		BrainStorm Task Survey 2013 @ <a href="http://www.nthu.edu.tw/" target="_blank">National Tsing Hua University</a> and <a href="http://www.washington.edu/" target="_blank">University of Washington</a>.
		<?php
			if(!isset($_SESSION['index'])){
				$_SESSION['index'] = time();
			}
			// echo $_SESSION['index'];
		?>
	</div>	

</body>
</html>

