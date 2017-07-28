var main = function () {
  $('.login').click(function(){
    $(this).find('.dropdown-menu').toggle();
  });

  $('#accordion').accordion();
};

$(document).ready(main);
