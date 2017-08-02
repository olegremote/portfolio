var app = angular.module ("OutboxApp", ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when('/', {
    controller: 'MainController',
    templateUrl: 'views/home.html'
  })
  .when('/emails/:id', {
    controller: 'EmailController',
    templateUrl: 'views/email.html'
  })
  .otherwise({
    redirectTo: '/'
  });

})
