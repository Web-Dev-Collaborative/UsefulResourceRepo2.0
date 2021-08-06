jQuery(document).ready(function ($) {

    
    $('#logo').mouseenter(function(){
        $('#logo').transition('tada');
    });

    $(window).stellar();

    var links = $('#navbar').find('li');
    var scrolling = false;
    slide = $('.slide');
    mywindow = $(window);
    htmlbody = $('body');


    slide.waypoint(function (event, direction) {
        dataslide = $(this).attr('data-slide');
        if (direction === 'down'){
            $('#navbar li[data-slide="'+dataslide+'"]').addClass('active').prev().removeClass('active');
            if(dataslide==2){
                $('#scrollToTop').fadeIn();                
                $('#scrollToTop').removeClass('content-hidden');
            }            
        }
        else{
            $('#navbar li[data-slide="'+dataslide+'"]').addClass('active').next().removeClass('active');
            if(dataslide==2){
                $('#scrollToTop').fadeOut();      
                $('#scrollToTop').addClass('content-hidden');
            }
        }
    }, { offset: 73 });
 
    $('#scrollToTop').click(function (e){
         htmlbody.animate({
            scrollTop: 0
        }, 700, 'easeInOutQuint');
    });

    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('#navbar li[data-slide="1"]').addClass('active');
            $('#navbar li[data-slide="2"]').removeClass('active');
        }
    });

    function goToByScroll(dataslide) {
        htmlbody.animate({
            scrollTop: $('.slide[data-slide="' + dataslide + '"]').offset().top-71
        }, 1500, 'easeInOutQuint');

        scrolling = false;
    }


    links.click(function (e) {
        if(scrolling){
            return;
        }else{
            scrolling = true;
        }
        e.preventDefault();
        dataslide = $(this).attr('data-slide');
        goToByScroll(dataslide);
    });


});