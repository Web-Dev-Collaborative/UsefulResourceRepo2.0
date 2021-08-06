<html>
	<head>
		<meta charset="utf-8">
		<title>NTHU Lazy pack</title>
		<script type="text/javascript" src="http://code.jquery.com/jquery-2.0.3.min.js"></script>
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,700,600' rel='stylesheet' type='text/css'>
		{{HTML::style('css/semantic-ui/semantic.css')}}
		{{HTML::style('css/normalize.css')}}
		{{HTML::style('css/index.css')}}
		{{HTML::script('js/jquery.easing.1.3.js')}}
		{{HTML::script('js/jquery.stellar.min.js')}}
		{{HTML::script('js/singlepage.js')}}
		{{HTML::script('js/waypoints.min.js')}}
		{{HTML::script('js/semantic-js/semantic.min.js')}}

	</head>
    <body>
    	<div id="wrapper">
    		
    		<nav id="navbar">
    			<div class="container">
	    			<div id="logo">
	    				<a href="cktest/"><i class="qr code icon"></i>NTHU LAZY PACK</a>
	    			</div>
	    			<ul>
	    				<li data-slide="1"><a href="/cktest">這是什麼?</a>  。</li>
	    				<li data-slide="2"><a href="/cktest">立即下載</a>  。</li>
	    				<li data-slide="3"><a href="/cktest">關於我們</a>  。</li>
						<li data-slide="4"><a href="login">登入服務</a></li>	
	    			</ul>
	    		</div>
    		</nav>
			

			@yield('content')


			<footer>
				<div class="container">
						NTHU LAZY PACK @ NTHU HSNL.<br/>
						<i class="smile icon"></i>
				</div>
			</footer>
	
    	</div>
        <div id="scrollToTop" class="content-hidden">
        	<i class="arrow up icon"></i>
        	
        </div>
    </body>
</html>
