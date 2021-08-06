$(function() {

	$('#submitmsg').click(function() {
		
		var userMessage = $('#usermsg').val(); 
		console.log(userMessage);
		userMessage = userMessage.replace(/</g, '&lt;');

		var sentMessage='<div class="chat-message clearfix"><img src="static/img/user.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><h5>User</h5><p>' + userMessage + '</p></div></div><hr>';
		
		var botMessage='<div class="chat-message clearfix"><img src="static/img/nearu.png" alt="" width="32" height="32"><div class="chat-message-content clearfix"><h5>NearU</h5><p>';
		var botEnd = '</p></div></div><hr>';

		$('.chat-history').append(sentMessage);

    	$.ajax({
        url: '/response',
        data: $('form').serialize(),
        dataType: 'json',
        type: 'POST',
        success: function(response) {
        	var replyMessage = '';
        	console.log(response);
        	response = JSON.parse(response);
            replyMessage = response.botReply;
            if(response.hasResults) {
            	var places = response.results;
            	if(places.length !== 0) {
            		for(var i = 0; i < places.length; i++) {
            			addPinpoint(places[i]);
            		}
            	}
            } 

        	reply = botMessage + replyMessage + botEnd;
            $('.chat-history').append(reply);

    		// Scroll down the chat history to latest message
	        var elem = document.getElementById('chatHist');
			elem.scrollTop = elem.scrollHeight;
        },
        error: function(error) {
            console.log(error);
        }
    });

		// Empty the text in input box
		$('#usermsg').val(""); 

		return false;	
	});
});


function addPinpoint(place) {
	// Adds a pinpoint to Leafleft map
	if (place.resultType=="place") {
		L.marker([place.lat, place.long])
		.addTo(mymap)
		.bindPopup(generatePlaceDetails(place), {className: 'card'});	
	} else {
		L.marker([place.lat, place.long])
		.addTo(mymap)
		.bindPopup(generateEventDetails(place), {className: 'card'});
	}
}

function generatePlaceDetails(place) {
   return "<div class='card--small'><div class='card__image' style='background-image: url(" + place.image + ")'></div><h2 class='card__title'>" + place.name + "</h2><span class='card__subtitle'>" + place.desc + "</span><div class='card__action-bar'><a href='place/" + place.id + "'><button class='card__button button_sliding_bg'>SEE MORE</button></a></div>";
}

function generateEventDetails(place) {
   return "<div class='card--small'><div class='card__image' style='background-image: url(" + place.image + ")'></div><h2 class='card__title'>" + place.title + "</h2><span class='card__subtitle'>" + place.description + "</span><div class='card__action-bar'><a href='event/" + place.id + "'><button class='card__button button_sliding_bg'>SEE MORE</button></a></div>";
}


(function() {

  $('#live-chat header').on('click', function() {
    $('.chat').slideToggle(300, 'swing');
    $('.chat-message-counter').fadeToggle(300, 'swing');

  });
}) ();