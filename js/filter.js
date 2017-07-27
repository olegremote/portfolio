var filterPrj = function() {

  /* affix the navbar after scroll below header */

  $('.navbar .nav li').click(function() {
    var $this=$(this);
    var $thisicon = $(this).find('.glyphicon');
    var category = $(this).attr('id');
    if (category != "reset") {

      /* $('.ih-item').show(); */
      $('.project:hidden').show();
      $('.navbar .nav li').removeClass('active');
      $('.navbar .nav li a span').removeClass();
      $('.navbar .nav li a span').addClass('glyphicon glyphicon-unchecked');
      $(this).addClass('active');
      $thisicon.removeClass();
      $thisicon.addClass('glyphicon glyphicon-check');
      $('.navbar .nav #reset a span').removeClass();
      $('.navbar .nav #reset a span').addClass('glyphicon glyphicon-off');

      /* hide all the projects except the ones that belong to the selected category */
      $('.project').filter(function(){
            return $(this).find('.framework').attr('alt') != category
      }).hide();

    };

    if (category === "reset") {
      $('.nav li').removeClass('active');
      $('.project:hidden').show();
      $('.nav li a span').removeClass();
      $('.nav li a span').addClass('glyphicon glyphicon-check');
      $('.nav #reset a span').removeClass();
      $('.nav #reset a span').addClass('glyphicon glyphicon-off');
    };

  });
};

$(document).ready(filterPrj());
