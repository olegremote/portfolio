app.controller('MainController', ['$scope', 'books', function($scope, books) {
  books.success(function(data){
    $scope.myBooks = data;
  });
  books.error(function(data){
    $scope.myBooks = {
      'title': 'ERROR',
      'author': data
    }
  })
}]);
