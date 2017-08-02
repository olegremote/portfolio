app.controller('MainController', ['$scope', 'events', function($scope, events) {

  events.success (function(data){
    $scope.day = data
  });
  events.error (function(data){
    $scope.day = {
      "date": 0000000000000,
      "events": [{
        "name": "ERROR",
        "from": 0000000000000,
        "to": 0000000000000,
        "where": data
      }]
    }
  });

}]);
