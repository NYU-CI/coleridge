$( window ).on( "load", function() {
  /* Add hover functionality to nav menu */
  $("ul.nav li").hover(function() {
    $(this).addClass('open');
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(100);
  }, function() {
    $(this).removeClass('open');
    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(100);
  })

  /* Mobile: Replicate hover functionality on nav menu */
  $('a.taphover').on('touchstart', function (e) {
    'use strict'; //satisfy code inspectors
    var link = $(this); //preselect the link
    if (link.hasClass('hover')) {
        return true;
    } else {
        link.addClass('hover');
        $('a.taphover').not(this).removeClass('hover');
        $(this).parent().addClass('open');
        e.preventDefault();
        return false; //extra, and to make sure the function has consistent return points
    }
  });

  $('.box').click(function() {

      $(this).animate({
          left: '-50%'
      }, 500, function() {
          $(this).css('left', '150%');
          $(this).appendTo('#dir-div');
      });

      $(this).next().animate({
          left: '50%'
      }, 500);
  });

  /* Jump to program dates and display appropriate panel in carousel */
  var program = getURLParameter('program')
  if (program <= 4) {

    $('.carousel-indicators li:nth-child(2)').removeClass('active');
    $('.carousel-indicators li:nth-child(' + program + ')').addClass('active');

    $('.carousel-inner .item:nth-child(2)').removeClass('active');
    $('.carousel-inner .item:nth-child(' + program + ')').addClass('active');

    window.location.hash = '#training-dates';
  }

});

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
