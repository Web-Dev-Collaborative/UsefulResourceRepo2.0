
$(function(){
  var count = $('.timestamp').html();
  // console.log($('.timestamp').html());
  countdown = setInterval(function(){
  	minute = Math.floor(count/60);
  	seconds = count%60;
    $(".countdown").html(minute+" minutes "+seconds + " seconds left.");
    $(".timestamp").html(count);
    if(count<=90){
    	$(".countdown").css("color","red");
    }
    if (count <= 0) {
      data += 'URI='+$('#URI').val()+'&count='+cnt+'&o='+$('#o').val()+'&r='+$('#r').val()+'&c='+$('#c').val()+'&t='+$('#t').val();
		// console.log(data);
		$(".countdown").html('Sending...')
		$.post('submit.php',data,function(msg){	

			working = false;
			$('.countdown').val('Done!');
			
			if(msg.status==1){
				window.location = "/brainstorm/endquestion.php?o="+msg.order;
			}else if(msg.status==3){
				task = Array("eye","thumb");
				window.location = "/brainstorm/"+task[msg.task]+".php?o="+msg.order+"&r="+msg.rule+"&c="+msg.bene+"&t="+msg.task+"";			
			}
			else {
				$.each(msg.errors,function(k,v){
					$('label[for='+k+']').append('<span class="error">'+v+'</span>');
				});
			}
		},'json');
    }
    if(count>0)
    	count--;
  }, 1000);
});

window.onload =function(){

}
