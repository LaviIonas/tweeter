$(document).ready(function() {
    $('#field').keyup(function() {
        var max = 140;
        var len = $(this).val().length;
        var char = max - len;
        if (len >= max) {
            $('#charNum').css('color', 'red');
            $('#charNum').text(char);
        } else {
            $('#charNum').css('color', 'black');
            $('#charNum').text(char);
        }
    });
});