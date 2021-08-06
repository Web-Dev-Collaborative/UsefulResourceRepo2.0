 <?php
	error_reporting(E_ALL^E_NOTICE);
	include "connect.php";
	require_once('PhpConsole.php');
	PhpConsole::start();
	session_start();
	if(empty($_SESSION['time'])){
		$_SESSION['time'] = 10;
		echo "session";
	}else{
		echo $_SESSION['time'];
	}
	// mysql_query("CREATE TABLE `timer` (
	// 	`id` int(10) unsigned NOT NULL auto_increment,
	// 	`name` varchar(128) collate utf8_unicode_ci NOT NULL default '',
	// 	`email` varchar(255) collate utf8_unicode_ci NOT NULL default '',
	// 	`suggest` text collate utf8_unicode_ci NOT NULL,
	// 	`dt` timestamp NOT NULL default CURRENT_TIMESTAMP,
	// 	`idea` text collate utf8_unicode_ci NOT NULL,
	// 	`ip` text collate utf8_unicode_ci NOT NULL,
	// 	`tag` int(10) unsigned NOT NULL default '0',
	// 	PRIMARY KEY  (`id`,`tag`)
	// 	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");

		

?>