app.controller('MainController', ['$scope', function($scope){
  $scope.title = 'Awesome App';
  $scope.promo = 'buy for just $1';
  $scope.products = [
    {
      name: 'The Book of Trees',
      price: 19,
      pubdate: new Date('2014', '03', '08'),
      cover: 'img/the-book-of-trees.jpg',
      likes: 0,
      dislikes: 0
  },
    {
      name: 'Program or be Programmed',
      price: 8,
      pubdate: new Date('2013', '08', '01'),
      cover: 'img/program-or-be-programmed.jpg',
      likes: 0,
      dislikes: 0
  },
    {
      name: 'Life\'s Golden Ticket',
      price: 10,
      pubdate: new Date('2007', '05', '08'),
      cover: 'img/lifes-golden-ticket.jpg',
      likes: 0,
      dislikes: 0
    },
    {
      name: 'The Millionaire Messenger',
      price: 11,
      pubdate: new Date('2011', '09', '06'),
      cover: 'img/the-millionaire-messenger.jpg',
      likes: 0,
      dislikes: 0
    }
  ];
  $scope.plusOne = function(index) {
    $scope.products[index].likes += 1;
  };
  $scope.minusOne = function(index) {
    $scope.products[index].dislikes += 1;
  };
}]);
