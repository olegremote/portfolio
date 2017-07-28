app.controller('MainController', ['$scope', function($scope) {
  $scope.posts = [
    {
      author: {
        name: 'Calvin Broadus, Jr.',
        avatar: 'img/cbj.svg'
      },
      comment: {
        img: 'img/dog.jpg',
        text: 'How much for that dogg in the window?'
      }
    },


    {
      author: {
        name: 'Matthew Healy',
        avatar: 'img/mh.svg'
      },
      comment: {
        text: 'I used to have a recurring dream when I was younger.'
      }
    },

    {
      author: {
        name: 'Jamie Oliver',
        avatar: 'img/mh.svg'
      },
      comment: {
        img: 'img/oliver-pie.jpg',
        text: 'I cook incredible apple raspberry pie right now. Watch me live!'
      }
    }

  ]
}]);
