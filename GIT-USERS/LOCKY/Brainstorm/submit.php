 <?php
// Error reporting:
error_reporting(E_ALL^E_NOTICE);

include "connect.php";
include "comment.class.php";
require_once('PhpConsole.php');
PhpConsole::start();

$arr = array();
session_start();

// Call the static method of comment class.
$validates = Comment::validate($arr); 

$uri = $arr['URI'];
$uri = str_replace(".", "", str_replace("/", "", str_replace("php", "", $uri)));
$ip	= (string)$_SERVER['REMOTE_ADDR'];
$tag = sprintf('%u',ip2long($_SERVER['REMOTE_ADDR']));

mysql_query("CREATE TABLE `ideaTable` (
	`id` int(10) unsigned NOT NULL auto_increment,
	-- `name` varchar(128) collate utf8_unicode_ci NOT NULL default '',
	-- `email` varchar(255) collate utf8_unicode_ci NOT NULL default '',
	-- `suggest` text collate utf8_unicode_ci NOT NULL,
	`dt` timestamp NOT NULL default CURRENT_TIMESTAMP,
	`endTime` int(50) NOT NULL default '0',
	`idea` text collate utf8_unicode_ci,
	`task` text collate utf8_unicode_ci NOT NULL,
	`incentive` text collate utf8_unicode_ci NOT NULL,
	`goal` text collate utf8_unicode_ci NOT NULL,
	`order` int(10) unsigned NOT NULL default '0',
	`timeSpend` int(10) unsigned NOT NULL default '0',
	`ideaNum` int(10) unsigned NOT NULL default '0',
	`ip` text collate utf8_unicode_ci NOT NULL,
	`tag` int(10) unsigned NOT NULL default '0',
	PRIMARY KEY  (`id`,`tag`)
	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");

mysql_query("CREATE TABLE `timeTable` (
	`id` int(10) unsigned NOT NULL auto_increment,
	`dt` timestamp NOT NULL default CURRENT_TIMESTAMP,
	`index` int(10) unsigned NOT NULL default '0',
	`introduction` int(10) unsigned NOT NULL default '0',
	`eye` int(10) unsigned NOT NULL default '0',
	`thumb` int(10) unsigned NOT NULL default '0',
	`ip` text collate utf8_unicode_ci NOT NULL,
	`tag` int(10) unsigned NOT NULL default '0',
	PRIMARY KEY  (`id`,`tag`)
	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");

// mysql_query("CREATE TABLE `userTable` (
// 	`id` int(10) unsigned NOT NULL auto_increment,
// 	`gender` text collate utf8_unicode_ci NOT NULL,
// 	`education` text collate utf8_unicode_ci NOT NULL,
// 	`age` text collate utf8_unicode_ci NOT NULL,
// 	`language` text collate utf8_unicode_ci NOT NULL,
// 	`residency` text collate utf8_unicode_ci NOT NULL,
// 	`citizenship` text collate utf8_unicode_ci NOT NULL,
// 	`ethnicity` text collate utf8_unicode_ci NOT NULL,
// 	`dt` timestamp NOT NULL default CURRENT_TIMESTAMP,
// 	`ip` text collate utf8_unicode_ci NOT NULL,
// 	`tag` int(10) unsigned NOT NULL default '0',
// 	PRIMARY KEY  (`id`,`tag`)
// 	) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");

//If the mess is valid, store them.
if($validates){
	$order = $arr['o'];
	$task = $arr['t'];
	$incen = $_SESSION['c'];
	$area = "none";
	$goal = $arr['r'];
	$timeTake = 60*10 - $arr['time'];

	$tasks = array("eye","thumb");
	$incentives = array("none","pay", "donate in america", "donate in india");
	$goals = array("quantity","quality");
	$areas = "none";

	// debug($arr['dynamic']);
	if($order==6){
		unset($_SESSION[$tasks[0]]);
		unset($_SESSION[$tasks[1]]);
		unset($_SESSION['c']);
		session_destroy();
		echo '{"status":1}';
		return;
	}
	else if($order==5){
		echo '{"status":1, "order":6}';
		return;
	}
	else if($order==4){
		echo '{"status":1, "order":5}';
		return;
	}else if($order==3){
		echo '{"status":1, "order":4}';
		return;
	}else if($order==2){ // the endQuestion
		echo '{"status":1, "order":3}';
		return;
	}
	else if($order==1){ //the order 2
		if($_SESSION[$tasks[$task]] == -1){
			echo '{"status":1, "order":2}';
			return;
		}else{
			//unset($_SESSION[$tasks[$task]]);
			$_SESSION[$tasks[$task]] = -1;
			mysql_query("INSERT INTO `ideaTable` (`endTime`,`idea`,`task`,`incentive`,`goal`,`order`,`timeSpend`,`ideaNum`,`ip`,`tag`)
				VALUES (
					'".time()."',
					'".$arr['dynamic']."',
					'".$tasks[$task]."',
					'".$incentives[$incen]."',
					'".$goals[$goal]."',
					'".$order."',
					'".$timeTake."',
					'".$arr['count']."',
					'".$ip."',
					'".$tag."'
					)");
			mysql_query("INSERT INTO `timeTable` (`index`,`introduction`,`eye`,`thumb`,`ip`,`tag`)
				VALUES (
					'".$_SESSION['index']."',
					'".$_SESSION['introduction']."',
					'".$_SESSION['eyet']."',
					'".$_SESSION['thumbt']."',					
					'".$ip."',
					'".$tag."'
					)");
			$arr['dt'] = date('r',time());
			$arr['id'] = mysql_insert_id();
			echo '{"status":1, "order":2}';
			return;
		}	
	}else{ // the order 1
		// debug($arr['URI']);
		if($_SESSION[$tasks[$task]] == -1){
			$task = ($task+1)%2;
			$goal = ($goal+1)%2;
			echo '{"status":3, "order":1, "bene":'.$incen.', "rule":'.$goal.', "task":'.$task.'}';
			return;
		}else{
			//unset($_SESSION[$tasks[$task]]);
			$_SESSION[$tasks[$task]] = -1;
			mysql_query("INSERT INTO `ideaTable` (`endTime`,`idea`,`task`,`incentive`,`goal`,`order`,`timeSpend`,`ideaNum`,`ip`,`tag`)
				VALUES (
					'".time()."',				
					'".$arr['dynamic']."',
					'".$tasks[$task]."',
					'".$incentives[$incen]."',
					'".$goals[$goal]."',
					'".$order."',
					'".$timeTake."',
					'".$arr['count']."',
					'".$ip."',
					'".$tag."'
					)");
			$arr['dt'] = date('r',time());
			$arr['id'] = mysql_insert_id();

			$task = ($task+1)%2;
			$goal = ($goal+1)%2;
			echo '{"status":3, "order":1, "bene":'.$incen.', "rule":'.$goal.', "task":'.$task.'}';
			return;
		}
	}
}
else{
	/* Outputtng the error messages */
	echo '{"status":0,"errors":'.json_encode($arr).'}';
}

?>