var main = function() {

  $('#top-text').keyup(function(){

    var topText = $('#top-text').val();

    $('h1.top-caption').text(topText);

  });

  $('#bottom-text').keyup(function() {

    var bottomText = $('#bottom-text').val();

    $('h1.bottom-caption').text(bottomText);

  });

  $('#image-url').keyup(function() {

    var imageUrl = $('#image-url').val();

   $('.thumbnail img').attr("src", imageUrl);

  });

};

$(document).ready(main);
