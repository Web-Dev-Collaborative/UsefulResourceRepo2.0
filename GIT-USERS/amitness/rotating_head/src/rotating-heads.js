/**
* Author: Sodhan Manandhar
* Description: Rotate heads on mouse hover
* Dependency: jQuery
* Additions: Number of seperate images can be any number
*/
(function ( $ ) {

	$.fn.rotateHeads = function( options ){

			 var settings = $.extend({
					 total_banner_width: 2155,
					 total_width: 431,
					 number_of_images: 5
			 }, options );

		const single_width = settings.total_width / settings.number_of_images;

		var rotate_container = this;

	 		rotate_container.mousemove(function( e ){

							var parentOffset = $(this).parent().offset();
							var relativeXPosition = (e.pageX - parentOffset.left); //offset -> method allows you to retrieve the current position of an element 'relative' to the document
							var count_of_images = settings.number_of_images;

							for( var i = 0; i< count_of_images; i++ ){ 
								
								if( relativeXPosition > single_width * i && relativeXPosition <= (single_width * (i+1)) ){

									$(this).css("background-position", "-" + settings.total_width * i +"px" + " 0");
								}
							}

			});

			return this;
	};

}( jQuery ));
