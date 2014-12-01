angular.module('App.Friends', [])

.controller('FriendsController', function($scope, $window, $location, $ionicSideMenuDelegate, FriendsFactory, ReceiversFactory, ServerRequests, ServerRoutes, Auth){

  $scope.swiping = function(direction){
    if (direction === 'left'){
      $location.path('/');
    }
  }

  $scope.routeToAddFriend = function(){
    $location.path('/add-friends');
  }

  $scope.toggleSettings = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  //get the userId from local storage
  var userId = $window.localStorage.getItem('userId');

  //get a list of all friends
  ServerRequests.post({ userId: userId }, ServerRoutes.getReceivers)
      .then(function(response){
        $scope.allFriends = response.receivers;
      })
      .catch(function(error){
          console.log(error);
      });
})
