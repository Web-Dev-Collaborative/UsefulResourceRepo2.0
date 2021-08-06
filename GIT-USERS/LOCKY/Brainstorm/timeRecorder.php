<?php
error_reporting(E_ALL^E_NOTICE);
include "connect.php";
require_once('PhpConsole.php');
PhpConsole::start();

	echo '{"status":1}';
?>