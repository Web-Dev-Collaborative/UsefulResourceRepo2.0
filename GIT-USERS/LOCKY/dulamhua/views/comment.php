<!-- include the header -->
<?php
require("template/header.php");		
?>


<div class="intro_3 intro_top bg-cyan" data-stellar-background-ratio="0.1">
	<h2>
		# 問題與討論，歡迎建議與討論<br/>
	</h2>
</div>

<div class="comment_container">
    <center>
        匿名留言需輸入信箱，當有人回應您的留言時，用為系統自動通知用，我們不收集您的信箱地址
    </center>
    <br/>
	<div id="disqus_thread"></div>
    <script type="text/javascript">
        /* * * CONFIGURATION VARIABLES: EDIT BEFORE PASTING INTO YOUR WEBPAGE * * */
        var disqus_shortname = 'dulamhuadisqus'; // required: replace example with your forum shortname

        /* * * DON'T EDIT BELOW THIS LINE * * */
        (function() {
            var dsq = document.createElement('script'); dsq.type = 'text/javascript'; dsq.async = true;
            dsq.src = '//' + disqus_shortname + '.disqus.com/embed.js';
            (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(dsq);
        })();
    </script>
    <noscript>Please enable JavaScript to view the <a href="http://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
    
    
</div>



<!-- include the header -->
<?php
require("template/footer.php");		
?>