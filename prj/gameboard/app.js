var main = function() {
  $('.more-btn').click(function(){
    $(this).next().toggle('more-menu');
  });
  $('.share').click(function(){
    $(this).next().toggle('share-menu');
  });
  $('.bell').click(function(){
    $(this).find('.notification').toggleClass('active');
  });
};

$(document).ready(main);
