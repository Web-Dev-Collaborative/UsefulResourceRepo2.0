$(function () {
    $('#topnav ul li a').click(function(){
        $('#topnav ul li a').removeClass('active');
        $(this).addClass('active');
    })

})