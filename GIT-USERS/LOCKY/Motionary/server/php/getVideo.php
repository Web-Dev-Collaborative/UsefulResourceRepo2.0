<?
	error_reporting(E_ALL^E_NOTICE);

	require_once('PhpConsole.php');
	PhpConsole::start();

	$db_host		= 'localhost';
	$db_user		= 'root';
	$db_pass		= 'root';
	$db_database		= 'video'; 

	$link = @mysql_connect($db_host,$db_user,$db_pass) or die('Unable to establish a DB connection');

	mysql_query("SET NAMES 'utf8'");
	mysql_select_db($db_database,$link);

	$row = mysql_query("SELECT `id`,`name` FROM `videolink` WHERE 1");
	$links = array();
	$i = 0;
	while ($arr = mysql_fetch_array($row, MYSQL_ASSOC)) {
		$links[$i++] = $arr['name'];
	}
	echo json_encode($links);

	mysql_free_result($row);
?>