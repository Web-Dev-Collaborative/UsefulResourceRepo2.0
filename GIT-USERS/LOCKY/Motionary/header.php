<?php
session_start();

if(!isset($out))
{
	exit;
}

require 'lib/util.lib.php';
require 'lib/user.lib.php';
require 'lib/video.lib.php';


$_GET = fURL();

$out['content'] = '';
$out['sub_prefix'] = '';
$out['baseURL'] = baseURL();

?>
