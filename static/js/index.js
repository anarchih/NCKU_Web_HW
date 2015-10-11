// Smooth scroll when click navbar
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();

        var target = this.hash,
        $target = $(target);

        $('html, body').stop().animate({
            'scrollTop': $target.offset().top - 50
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});

// hide navbar collapse on click
$('.nav a').on('click', function(){


    if($(window).width() < 753){
        $('.navbar-toggle').click()
    }

});

// change color of clicked navbar item
$('nav a').on('click', function(){
    $("nav li").attr("class", "");
    $(this).parent().attr("class", "active");
})
