$(function () {
    $('img').css({width:'50px',height:'50px'})
    $('.highlight').mouseleave(function(){
        $(this).height('40px');
        $(this).css('background-color','white')
    }).mouseenter(function(){
        $(this).height('200px');
        $(this).css('background-color','red')
    })
    $('#wrapper > div').click(function(){
        $(this).children().toggle();
    })
    $('h1').click(function(){
       $('#wrapper > div').children().toggle(); 
    })
})