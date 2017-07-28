var main = function() {
    var cities = ["Lviv", "Kyiv", "Ternopil", "Buchach", "Odesa", "Kharkiv", "Dnipro"];
    $('.city-input').autocomplete({
      source: cities
    });
};

$(document).ready(main);
