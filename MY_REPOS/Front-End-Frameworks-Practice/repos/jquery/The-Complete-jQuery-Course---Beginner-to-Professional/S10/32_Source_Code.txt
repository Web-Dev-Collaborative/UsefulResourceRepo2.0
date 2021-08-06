$(function () {
    $('button').on('click', submitForm);

    function submitForm() {
        var formValues = $('form').serialize();
        var tempHolder = formValues.split('&');
        var $a = $('input[name="agree1"]');
        if ($a.prop('checked')) {
            outputUpdate(tempHolder);
        }
        else {
            alert('check TOS before you can submit!!!');
        }
    }
    $('input[name="agree2"]').change(function () {
        //alert('Checked Button '+$(this).attr('name'));
        $('input').removeAttr('placeholder');
    })
    $('input[name="agree1"]').change(function () {

        $('input[name="first"]').attr('placeholder','FirstName');
    })

    function outputUpdate(tempHolder) {
        $('#mainDiv').empty();
        $('input').css('background-color', 'white');
        $.each(tempHolder, function (index, value) {
            var elementName = value.split('=');
            var $el = $('input[name="' + elementName[0] + '"]');
            if ($el.val() == '') {
                $el.css('background-color', 'red');
                $el.after('<div class="error">' + elementName[0] + ' value is missing</div>')
            }
            else {
                $el.nextAll('.error').remove();
            }
            $('#mainDiv').append(elementName[0] + ' ' + elementName[1] + '<br>');
        })
    }
})