(function ($) {
    'use strict';

    var hashID;

    $('.accordion:first-child').addClass('active');
    $('.accordion:first-child .accordion__content').show();
    
    $('.accordion__title').on('click', function(e) {
        e.preventDefault();
        if($(this).data("id")){
            window.location.hash = $(this).data("id");
        }
        if ($(this).parents('.accordion').hasClass('active')) {
            $(this).parents('.accordion').removeClass('active');
            $(this).parent().next('.accordion__content').slideUp();
        } else {
            $('.accordion').removeClass('active');
            $('.accordion__content').slideUp("slow");
            $(this).parents('.accordion').addClass('active');
            $(this).parent().next('.accordion__content').slideDown("slow", function() {
                $("html,body").animate({
                    scrollTop: ($(this).parents('.accordion').offset().top - $('.header__menu-wrapper').height())
                }, "slow");
            });
        }
    });
    
    $(document).ready(function(e){
        if(window.location.href.indexOf("#") > -1){
            if(window.location.hash.substr(1)!='' || window.location.hash.substr(1)!=null){
                hashID = window.location.hash.substr(1);
                $('.accordion__title[data-id='+ hashID +']').click();
            }
        }
    });

})(jQuery);