app.controller('BookController', ['$scope', 'books', '$routeParams', function($scope, books, $routeParams) {

  books.success( function(data) {
    $scope.currentBookIndex =  parseInt($routeParams.bookId);
    $scope.book = data[$routeParams.bookId];
  });
  books.error( function(data){
    $scope.book = {
      'title': 'ERROR',
      'author': data
    }
  })

}]);
