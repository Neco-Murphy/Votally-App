angular.module('App.AddFriends', [])

.controller('AddFriendsController', function($scope, $window, ServerRequests, ServerRoutes, AddFriendsFactory){
  $scope.requestsAmount = 0;

  //determine the proper sentence ending for the amount of friend requests
  $scope.sentenceEnd = AddFriendsFactory.getSentenceEnd($scope.requestsAmount);

  $scope.requestResponse = '';

  $scope.responseExists = function(){
    var check = ($scope.requestResponse === '') ? false : true;
    console.log(check);
    return check;
  }

  $scope.makeRequest = function(friendName){
    ServerRequests.post({username: friendName}, ServerRoutes.requestFriend)
      .then(function(response){
        $scope.requestResponse = response;
      })
      .catch(function(error){
        $scope.requestResponse = 'There was an error with your Friend Request'
          console.log(error);
      });
  }

})
