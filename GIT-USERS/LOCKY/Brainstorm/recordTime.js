

$(document).ready(function(){
	$(".nextLink").click(function(e){
		alert("test");
		$.post('recordtime.php',function(rMsg){
			console.log("msg: "+rMsg);
		});
	});
});