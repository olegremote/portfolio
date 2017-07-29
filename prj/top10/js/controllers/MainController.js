app.controller('MainController', ['$scope', 'shows', function($scope, shows) {

  shows.success( function(data) {
    $scope.shows = data;
  });
  shows.error( function(data) {
    $scope.shows = {
      "series": "ERROR reading from server",
      "series_img": "https://www.solidsmack.com/wp-content/uploads/2008/05/solidworks-error.jpg",
      "genre": "Error",
      "run_start": 0000,
      "description": data
    }
  })

}]);
