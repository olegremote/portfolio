var main = function () {

  $('img').click(function() {
    $(this).next().toggle(500);
  });

  $('form').submit(function(){
    var email = $(this).find('#email').val();
    var password = $(this).find('#password').val();

    if (email === '' ) {
      $('p.email-error').text('Please enter your email');
    };

    if (password === '' ) {
      $('p.password-error').text('Please enter your password');
    };

    return false;
  });
};

$(document).ready(main);
