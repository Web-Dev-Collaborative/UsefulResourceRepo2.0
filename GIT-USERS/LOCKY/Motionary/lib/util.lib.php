<?php

function isGET($name)
{
	return isset($_GET[$name]) && is_string($_GET[$name]);
}

function isPOST($name)
{
	return isset($_POST[$name]) && is_string($_POST[$name]);
}

function isGETValidEntry($type, $name)
{
	return isGET($name) && isValidEntry($type, $_GET[$name]);
}

function isGETValidHook($hook, $name)
{
	return isGET($name) && isValidHook($hook, $_GET[$name]);
}

function fURL()
{
	$out = array();
	if(isset($_SERVER['PATH_INFO']))
	{
		$info = explode('/', $_SERVER['PATH_INFO']);
		$infoNum = count($info);
		for($i=1; $i<$infoNum; $i+=2)
		{
			if($info[$i] !== '')
				$out[$info[$i]] = isset($info[$i+1])? $info[$i+1] : '';
		}
	}
	return $out;
}

function baseURL()
{
	$dir = dirname($_SERVER['SCRIPT_NAME']);
	return 'http://' .$_SERVER['SERVER_NAME'].$dir.($dir === '/'? '' : '/');
}

function _max($arr, $limit)
{
	$size = count($arr);
	if($size <= $limit)
	{
		rsort($arr);
		return $arr;
	}
	$out = array();
	for($i=0; $i<$limit; $i++)
	{
		$maxI = 0;
		for($j=1; $j<$size; $j++)
		{
			if ($arr[$j] > $arr[$maxI])
				$maxI = $j;
		}
		$out[] = $arr[$maxI];
		unset($arr[$maxI]);
		$size--;
	}
	return $out;
}

function redirect($loc)
{
	header('Location: ' .baseURL().$loc);
	exit;
}

function onPage($item, $items)
{
	return (int) (array_search($item, array_values($items), true) / 8) + 1;
}

function shortNum($int)
{
	if($int < 1000)
		return $int;
	else
		return round($int/1000, 1). 'K';
}

function toDate($id, $pattern = 'Y/m/d H:i')
{
	global $lang;
	$timestamp = strtotime(substr($id, 0, 16));
	$diff = time() - $timestamp;
	if($pattern === 'Y/m/d H:i' && $diff < 604800) //1 week
	{
		$periods = array(86400 => $lang['day'], 3600 => $lang['hour'], 60 => $lang['minute'], 1 => $lang['second']);
		foreach($periods as $key => $value)
		{
			if($diff >= $key)
			{
				$num = (int) ($diff / $key);
				return $num. ' ' .$value.($num > 1? $lang['plural'] : ''). ' ' .$lang['ago'];
			}
		}
	}
	return date($pattern, $timestamp);
}

function lang($format)
{
	global $lang;
	$argList = func_get_args();
	$wordList = array();
	foreach(explode(' ', $format) as $word)
	{
		$wordList[] = isset($lang[$word])? $lang[$word] : $word;
	}
	return vsprintf(implode($lang['useSpace']? ' ' : '', $wordList), array_slice($argList, 1));
}


function validate_text($str){
		/*
		/	This method is used internally as a FILTER_CALLBACK
		*/
		
		if(mb_strlen($str,'utf8')<1)
			return false;
		
		// Encode all html special characters (<, >, ", & .. etc) and convert
		// the new line characters to <br> tags:
		
		$str = nl2br(htmlspecialchars($str));
		
		// Remove the new line characters that are left
		$str = str_replace(array(chr(10),chr(13)),'',$str);
		
		return $str;
}

function intoISOTimestamp($time){
	$unixTime = strtotime($time.' GMT');
	$reqDate = new DateTime("@$unixTime");
	$reqDate = explode("+", $reqDate->format('c'));

	return $reqDate[0];
}

function alphaID($in, $to_num = false, $pad_up = false, $passKey = null){
	$index = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	if ($passKey !== null) {
		// Although this function's purpose is to just make the
		// ID short - and not so much secure,
		// with this patch by Simon Franz (http://blog.snaky.org/)
		// you can optionally supply a password to make it harder
		// to calculate the corresponding numeric ID

		for ($n = 0; $n<strlen($index); $n++) {
			$i[] = substr( $index,$n ,1);
		}

		$passhash = hash('sha256',$passKey);
		$passhash = (strlen($passhash) < strlen($index))
			? hash('sha512',$passKey)
			: $passhash;

		for ($n=0; $n < strlen($index); $n++) {
			$p[] =  substr($passhash, $n ,1);
		}

		array_multisort($p,  SORT_DESC, $i);
		$index = implode($i);
	}

	$base  = strlen($index);

	if ($to_num) {
		// Digital number  <<--  alphabet letter code
		$in  = strrev($in);
		$out = 0;
		$len = strlen($in) - 1;
		for ($t = 0; $t <= $len; $t++) {
			$bcpow = bcpow($base, $len - $t);
			$out   = $out + strpos($index, substr($in, $t, 1)) * $bcpow;
		}

		if (is_numeric($pad_up)) {
			$pad_up--;
			if ($pad_up > 0) {
				$out -= pow($base, $pad_up);
			}
		}
		$out = sprintf('%F', $out);
		$out = substr($out, 0, strpos($out, '.'));
	} else {
		// Digital number  -->>  alphabet letter code
		if (is_numeric($pad_up)) {
			$pad_up--;
			if ($pad_up > 0) {
				$in += pow($base, $pad_up);
			}
		}

		$out = "";
		for ($t = floor(log($in, $base)); $t >= 0; $t--) {
			$bcp = bcpow($base, $t);
			$a   = floor($in / $bcp) % $base;
			$out = $out . substr($index, $a, 1);
			$in  = $in - ($a * $bcp);
		}
		$out = strrev($out); // reverse
	}

	return $out;
}

?>
