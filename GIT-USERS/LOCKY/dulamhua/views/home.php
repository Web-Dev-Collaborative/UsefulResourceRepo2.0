<!-- include the header -->
<?php
require("template/header.php");		
?>
<?php
 $ran_title = array("充滿回憶的","您最熟悉的","一起楓橋的","我們的老家");
 $ran = rand(0,3);
?>

<div class="intro_1_home">
	<h2 id="promote_title"><i class="icon-clock"></i> 無限期延期<br/><i class="icon-location"></i><?php echo $ran_title[$ran];?>資電館B1地演廳 <br/> 和我們一同，<br/>參與賭上未來友誼的 賭藍花論壇
	<br/><br/><button class="large  bg-lightGreen applyWindow register_btn"><i class="icon-thumbs-down on-left"></i>報名去賭爛</button>
	<button class="large  bg-lightOlive play_video_btn" id="createWindowYoutube"><i class="icon-vimeo on-left"></i>搶先看賭爛<span class="badge">1則新影片</span></button>
	</h2>
</div>

<div class="intro_2">
	<h1>賭爛無罪<br/>心結有理</h1>


</div>

<!-- include the header -->
<?php
require("template/footer.php");		
?>