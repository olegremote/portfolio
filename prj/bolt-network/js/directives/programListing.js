app.directive('programList', function() {
  return {
    restrict: 'E',
    scope: {
      listing: '='
    },
    templateUrl: 'js/directives/programListing.html'
  }
})
