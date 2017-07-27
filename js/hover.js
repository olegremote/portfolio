// this script is intended for touchscreen devices
// and "converts mouseover event into touch", i.e.
// on first touch user sees project name and short info
// as image overlay and only on second touch the corresponding modal
// with project details is opened

var hoverToTouch = function () {

  $('a.prj-details').on("touchstart", function (e) {
    'use strict'; //satisfy code inspectors
    var link = $(this); //preselect the link
    if (link.hasClass('hover_effect')) {
      return true;
    }
    else {
      $('a.prj-details').removeClass('hover_effect', function() {
        link.addClass('hover_effect');
        e.preventDefault();
      });
      return false; //extra, and to make sure the function has consistent return points
    }
  });

  $(".modal").on("hide.bs.modal", function() {
    $('a.prj-details').removeClass('hover_effect');
  });

};

$(document).ready(hoverToTouch());
