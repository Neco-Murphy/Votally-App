angular.module('App.Friends', [])

.controller('FriendsController', function($scope, $window, $location, $ionicSideMenuDelegate, FriendsFactory, ServerRequests, ServerRoutes, Auth){

  $scope.swiping = function(direction){
    if (direction === 'left'){
      $location.path('/');
    }
  }

  $scope.routeToAddFriend = function(){
    $location.path('/add-friends');
  }

  // $scope.showSettings = function(){
  //   $location.path('/settings');
  // }

  $scope.toggleSettings = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.allFriends = FriendsFactory.tempFriends;

})
