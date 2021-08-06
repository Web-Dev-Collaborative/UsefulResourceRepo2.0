var i = 1; 
var cnt = 0; // numbers of ideas
var data =''; //the data from survey

$(document).ready(function(){

	// Retrieve the object from storage
	if(localStorage.getItem('dataRestore')!=null){
		cnt = localStorage.getItem('count'), data = localStorage.getItem('dataRestore');
		$('.ideas').html(localStorage.getItem('ideasRestore'));
	}
	
	var working = false;
	$('<textarea type="text" rows="4" class="field" name="dynamic'+ i + '" placeholder="Input an idea here..." />').fadeIn('slow').appendTo('.inputs');
	
	$('#exitBtn').click(function(e){
		e.preventDefault();
		if(working) return false;
		working = true;
		$('#exitBtn').html('Sending...');
		$('.countdown').html('Sending...');
		$('span.error').remove();

		data += 'URI='+$('#URI').val()+'&count='+cnt+'&o='+$('#o').val()+'&r='+$('#r').val()+'&t='+$('#t').val()+'&time='+$('.timestamp').html();
		// console.log(data);
		$.post('submit.php',data,function(msg){	
			working = false;
			$('#exitBtn').html('Done!');
			$('.countdown').html('Done!');

			$('#exitBtn').attr("disabled", true);
			if(msg.status==1){
				window.location = "/brainstorm/endquestion.php?o="+msg.order;
				localStorage.removeItem('dataRestore');
				localStorage.removeItem('count');
				localStorage.removeItem('ideasRestore');

			}else if(msg.status==3){
				task = Array("eye","thumb");
				window.location = "/brainstorm/"+task[msg.task]+".php?o="+msg.order+"&r="+msg.rule+"&t="+msg.task+"";
				localStorage.removeItem('dataRestore');
				localStorage.removeItem('count');		
				localStorage.removeItem('ideasRestore');		
			}
			else {
				$.each(msg.errors,function(k,v){
					$('label[for='+k+']').append('<span class="error">'+v+'</span>');
				});
			}
		},'json');

	});	

	$('#addCommentFormEnd').submit(function(e){
		e.preventDefault();
		if(working) return false;
		working = true;
		$('#submit').val('Sending..');
		$('span.error').remove();
		var dataEnd = $(this).serialize()+'&count=0';
		// console.log(dataEnd);
		$.post('submit.php',dataEnd,function(msg){	
			working = false;
			$('#submit').val('Submit');
			if(msg.order==3){
				window.location = "/brainstorm/endquestion1.php?o="+msg.order;
			}
			else if(msg.order==4){
				window.location = "/brainstorm/endquestion2.php?o="+msg.order;
			}else if(msg.order==5){
				window.location = "/brainstorm/endquestion3.php?o="+msg.order;
			}else if(msg.order==6){
				window.location = "/brainstorm/endquestion4.php?o="+msg.order;
			}else if(msg.status==1){
				window.location = "/brainstorm/result.php";
			}else {
				// console.log('status: 0');
				$.each(msg.errors,function(k,v){
					$('label[for='+k+']').append('<span class="error">'+v+'</span>');
				});
			}
		},'json');

	});	

	$("#enterBtn").click(function(){
			var text = $('.field').val();
			
			if(text==''){
				console.log('space');
				return false;
			}
			
			cnt++;
			data += 'dynamic'+cnt+'='+text+'&';
			localStorage.setItem('dataRestore', data);
			localStorage.setItem('count', cnt);
			$('#ideaIndicator').html(' ');
			$('.ideas').prepend('<div>'+cnt+'. '+text+'</div>');
			localStorage.setItem('ideasRestore', $('.ideas').html());

			$('.field').val('');
			//console.log($('#URI').val());
			return false;
	});

	$(".nextLink").click(function(e){
		console.log(e);
		var url = document.URL;

		$.post('timeRecorder.php',{"url":url},function(msg){
			console.log(msg);
			window.location = "/brainstorm/introduction.php";
		});
	});
	
});





