app.controller('MainController', ['$scope', 'emails', function($scope, emails) {

  emails.success(function(data){
    $scope.emails = data;
  });
  emails.error(function(data){
    $scope.emails = {
      "from": "SERVER",
      "datetime": 0000000000000,
      "subject": "Error reading emails from server",
      "message": data,
      "unread": true
    };
  });

}]);
