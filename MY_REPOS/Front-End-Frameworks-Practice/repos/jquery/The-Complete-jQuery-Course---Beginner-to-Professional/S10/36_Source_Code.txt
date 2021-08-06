$(function () {
    $('button').on('click', submitForm);

    function submitForm() {
        var $el = $('input[type="text"],input[type="password"]');
        $el.prev('label').removeClass('error');
        for(x=0;x<$el.length;x++){
            //console.log($el.eq(x).val());
            //console.log($el.eq(x).attr('name'));
            if($el.eq(x).val()==''){
                $el.eq(x).prev('label').addClass('error');
            }
            
           
        }
        
        
    }



})