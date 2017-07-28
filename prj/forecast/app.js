var main = function() {
  $('.day').click(function(){
    $(this).next().toggleClass('hourly');
    $(this).find('span').toggleClass('glyphicon-minus');
  });
};

$(document).ready(main);
