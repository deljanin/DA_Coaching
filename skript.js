$(function () {
    $(window).on('scroll', function () {
        if ( $(window).scrollTop() > 10 ) {
            $('.navbar').addClass('myactive');
        } else {
            $('.navbar').removeClass('myactive');
        }
    });
});
$(function () {
    $('[data-toggle="popover"]').popover()
})
