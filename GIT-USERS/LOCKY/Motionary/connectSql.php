<?php
/* Database config */
	$db_host		= 'localhost';
	$db_user		= 'locky4567';
	$db_pass		= 'KO963528LOHAOWEIJENG';
	$db_database		= 'motionData'; 
	/* End config */

	$link = @mysql_connect($db_host,$db_user,$db_pass) or die('Sorry, unable to establish a DB connection');

	mysql_query("SET NAMES 'utf8'");
	mysql_select_db($db_database,$link);

?>