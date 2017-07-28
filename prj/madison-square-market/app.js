var main = function () {
  $('.cart').click(function() {
    $(this).find('ul').toggle();
    $(this).siblings().find('ul').hide();
  });

  $('.account').click(function(){
    $(this).children('.dropdown-menu').toggle();
    $(this).siblings().find('.dropdown-menu').hide();
  });

  $('.help').click(function(){
    $(this).children('ul').toggle();
    $(this).siblings().children('ul').hide();
  });
};

$(document).ready(main);
