(function ($) {
  'use strict';

    /* ---------- IE 11 class start ---------- */
    function isIE() {
      let ua = window.navigator.userAgent; //Check the userAgent property of the window.navigator object
      let msie = ua.indexOf('MSIE '); // IE 10 or older
      let trident = ua.indexOf('Trident/'); //IE 11
      return (msie > 0 || trident > 0);
    }
    function addIEClass() {
      if (isIE()) {
        $('body').addClass('ie');
      }
    }
    /* ---------- IE 11 class ends ---------- */

  /* ---------- ready starts ---------- */
  $(document).ready(function(e){
    console.log('document is ready');

    /* ---------- Back to top starts --------- */
    if ($(window).width() >= 768) {
      $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
          $('.backtotop').fadeIn();
        } else {
          $('.backtotop').fadeOut();
        }
      });
      $(document).on('click', '.backtotop', function (e) {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
      });
    }
    /* ---------- Back to top ends --------- */
  });
  /* ---------- ready starts ---------- */

  /* ---------- load starts ---------- */
  $(window).on('load', function(e){
    console.log('window is loaded');
  });
  /* ---------- load ends ---------- */
      
})(jQuery);