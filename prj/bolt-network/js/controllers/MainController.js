app.controller('MainController', ['$scope', function($scope) {
  $scope.programs = [
    {
    series: "Sherlock",
    series_img: "img/sherlock.jpg",
    genre: "Crime drama",
    season: 3,
    episode: "The Empty Hearse",
    description: "Two years after his reported Reichenbach Fall demise, Sherlock, who has been cleared of all fraud charges against him, returns with Mycroft's help to a London under threat of terrorist attack. John has moved on and has a girlfriend, Mary Morstan. Sherlock enlists Molly to assist him, but when John is kidnapped by unknown assailants and is rescued by Sherlock and Mary, John returns to help find the terrorists and an underground plot to blow up the Houses of Parliament during an all night sitting on Guy Fawkes Night.",
    datetime: new Date(2017, 07, 15, 21, 00, 00, 00)
  },
    {
    series: "The Tonight Show Starring Jimmy Fallon",
    series_img: "img/TheTonightShow.png",
    genre: "Talk show",
    season: 4,
    episode: "World of Dad Dance",
    description: "World of Dad Dance; Keith Sweat sits in with The Roots; Tonight Show Pros & Cons: Replacing Sean Spicer; Charades (Jimmy Fallon & Jessica Biel Vs. Matt Bomer & Kelsea Ballerini); Matt Bomer raps; Kelsea Ballerini performed \"Legends\"",
    datetime: new Date(2017, 07, 14, 23, 30, 00, 00)
  },
  {
  series: "Minuscule",
  series_img: "img/minuscule.jpg",
  genre: "Animation",
  season: 4,
  episode: "Torpedo",
  description: "Minuscule is a French series of short video animations giving \"a bird\'s eye view of insects\' day to day existence, distorted through a burlesque, yet poetic lens\". The characters are computer-modelled in 3D and set against natural scenery. Each animation has a self-contained and usually humorous storyline.",
  datetime: new Date(2017, 07, 14, 20, 15, 00, 00)
}
  ]
}]);
