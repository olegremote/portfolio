//some carousel animations
// and navbar (filter) scrolling stick to top

var animatePrtfl = function () {

  $(".navbar").affix({
    offset: {
      top: $(".carousel").outerHeight(true) + $(".intro").outerHeight(true)
    }
  });

  $("#myCarousel").ready(function() {
    var $caption = $(this).find('.active').find('.carousel-caption').find('p');
    $caption.css("opacity", "0");
    $caption.css("left", "-130%");
    $caption.animate({opacity: '1'}, 500);
    $caption.animate({left: '0'}, 500);
  });

  $("#myCarousel").on('slid.bs.carousel', function() {
    var $caption = $(this).find('.active').find('.carousel-caption').find('p');
    $caption.css("opacity", "0");
    $caption.css("left", "-130%");
    $caption.animate({opacity: '1'}, 500);
    $caption.animate({left: '0'}, 500);
  });

  $("#myCarousel").ready(function() {
    var $caption = $(this).find('.active').find('.carousel-logos');
    $caption.css("opacity", "0");
    $caption.animate({opacity: '1'}, 2000);
  });

};

$(document).ready(animatePrtfl());
