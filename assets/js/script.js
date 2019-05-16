(function($){
	$.fn.serializeObject = function () {
		"use strict";

		var result = {};
		var extend = function (i, element) {
			var node = result[element.name];

	// If node with same name exists already, need to convert it to an array as it
	// is a multi-value field (i.e., checkboxes)

			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
})(jQuery);

$(document).ready(function(){
  var $form = $('form#rc-form')
  var url = 'https://script.google.com/macros/s/AKfycbzQMrLAM2wLVQjaSWk_aHtonwv-VIwYxTuejI7Nuu19KQBZDs8/exec'

  $('#submit-form').on('click', function(e) {
    e.preventDefault();
    var jqxhr = $.ajax({
      url: url,
      method: "GET",
      dataType: "json",
      data: $form.serializeObject(),
      success: function(data, textStatus) {
        console.log(data);
        console.log(textStatus);
        alert("Thank you! We have received your submission.");
        $('form#rc-form').trigger("reset");
      },
      error: function() {
        alert("There was an error submitting your data.");
      }
    });
  });
});

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
  //var len = $('.carousel-indicators').children().length;
  var programs = [];
  $('.carousel-indicators').children().each(function() {
    programs.push($(this).attr("id"));
  });

  if ( programs.includes(program) ) {
    var programid = "#" + program;

    $('.carousel-indicators').children('.active').removeClass('active');
    $('.carousel-indicators').children(programid).addClass('active');

    $('.carousel-inner').children('.active').removeClass('active');
    $('.carousel-inner').children(programid).addClass('active');

    window.location.hash = '#training-dates';
  }
});

function getURLParameter(name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
}
