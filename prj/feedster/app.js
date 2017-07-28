var main = function() {
  $('.notification').find('img').click(function(){
    $('.notification-menu').toggle('slow');
  });
  $('.post').find('.btn').click(function(){
    $(this).toggleClass('btn-like');
  });
};

$(document).ready(main);
