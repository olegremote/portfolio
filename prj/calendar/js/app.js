var app = angular.module('CalendarApp', ['ngRoute']);

app.config(function($routeProvider) {

  $routeProvider
  .when ('/', {
    controller: 'MainController',
    templateUrl: 'views/day.html'
  })
  .when ('/:id', {
    controller: 'EventController',
    templateUrl: 'views/event.html'
  })
  .otherwise({
    redirectTo: '/'
  })

})
