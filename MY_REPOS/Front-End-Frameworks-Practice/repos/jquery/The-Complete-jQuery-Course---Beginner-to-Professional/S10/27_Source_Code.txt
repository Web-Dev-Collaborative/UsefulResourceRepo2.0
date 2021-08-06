$(function () {
    var counter = 0;
   $('.highlight').click(function(){
       counter++;
       $(this).empty();
       $(this).html('');
       $(this).before('BEFORE '+counter);
       $(this).append('clicked '+counter);
       $(this).prepend('Pre '+counter);
       $(this).after('AFTER '+counter)
   })
    $('h1').click(function(){
        counter++;
        $('h1').prepend(counter);
        $('h1').before('B'+counter);
    })
    
})