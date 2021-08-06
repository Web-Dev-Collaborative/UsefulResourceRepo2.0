<?php
	
	function createUserTable(){		
		mysql_query("CREATE TABLE userData (
			uid int(10) unsigned NOT NULL auto_increment,
			registrationTime timestamp NOT NULL default CURRENT_TIMESTAMP,
			email text collate utf8_unicode_ci,
			firstName text collate utf8_unicode_ci NOT NULL,
			lastName text collate utf8_unicode_ci NOT NULL,			
			locale text collate utf8_unicode_ci NOT NULL,			
			ip text collate utf8_unicode_ci NOT NULL,						
			ipTag int(10) unsigned NOT NULL default '0',
			PRIMARY KEY  (uid,ipTag)
			) ENGINE=MyISAM  DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci");
	}

	function insertUser($arr){
		if(NULL != mysql_fetch_array(searchUserBymail($arr['email']))){
			return;
		}
		mysql_query("INSERT INTO userData (email,firstName,lastName,locale,ip,ipTag,nickName) VALUES ('"
  		.$arr['email']."',
  		'".$arr['first_name']."',
  		'".$arr['last_name']."',
  		'".$arr['locale']."',
  		'".$arr['ip']."',
  		'".sprintf('%u',ip2long($arr['ip']))."',
  		'".$arr['first_name']."'
  		)");
	}

	function searchUserBymail($mail){
		return mysql_query("SELECT * FROM userData WHERE email='".$mail."'");
	}

	function updateUserBymail($mail,$arr){
		return mysql_query("UPDATE userData SET nickName = '".$arr['nickName']."' WHERE email='".$mail."'");
		$_SESSION['nickName'] = $arr['nickName'];
	}

	function updateRequest($arr){
		// alert($arr);
		$ori_budget = mysql_fetch_array(mysql_query("SELECT budget FROM videodata WHERE identity='".$arr['identity']."'"));
		$new_budget = $ori_budget['budget'] + $arr['budget'];
		return mysql_query("UPDATE videodata SET budget = '".$new_budget."', deadline = '".$arr['addTime']."' WHERE identity='".$arr['identity']."'");
		// return true;
	}

	function isLogin()
	{
		if(isset($_SESSION['login'])){
			return $_SESSION['login'] === true;
		}else{
			return false;
		}
	}

	function isAdmin()
	{
		if(isset($_SESSION['login'])){
			return $_SESSION['mail']=="locky4567@gmail.com"||$_SESSION['mail']=="richo2192000@gmail.com"||$_SESSION['mail']=="dan801212@gmail.com";
		}else{
			return false;
		}
	}


?>