$(function () {
    $('.highlight').css({
        backgroundColor:'red',
        padding:'10px',
        margin:'5px',
        border:'1px solid #ddd'
    })
    $('.highlight').click(function(){
        $(this).hide(5000,function(){
            $(this).next().css('background-color','blue');
        })
        $('h1').toggle();
    })
    
    $('.sel').change(function(){
        $('.highlight').show(500,function(){
            $('.highlight').css('background-color',$('.sel').val());
        })
    })
    
    
    
    
})