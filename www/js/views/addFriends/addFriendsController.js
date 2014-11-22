angular.module('App.AddFriends', [])

.controller('AddFriendsController', function($scope, $window, $location, ServerRequests, ServerRoutes, AddFriendsFactory){
  //get userId from local storage
  var userId = $window.localStorage.getItem('userId');
  //userId = 22222;

  //route back to friends if back button is pushed
  $scope.routeBack = function(){
    $location.path('/friends');
  }

  //set default amount of pending friend requests
  $scope.requestersAmount = 0;

  //set default response to an attempt to add a friend
  $scope.requestResponse = '';

  //determines if a response message will show or not
  $scope.responseExists = function(){
    return ($scope.requestResponse === '') ? false : true;
  }

  //make a friend request
  $scope.makeRequest = function(friendName){
    var dataToSend = {requesterId: userId, confirmerName: friendName}
    ServerRequests.post(dataToSend, ServerRoutes.requestFriend)
      .then(function(response){
        $scope.requestResponse = response;
      })
      .catch(function(error){
        $scope.requestResponse = 'There was an error with your Friend Request'
          console.log(error);
      });
  }

  //Storage array for all pending friend requests
  $scope.allRequesters = [];

  //get all pending friend requests
  $scope.getPendingRequests = function(){
    ServerRequests.post({userId: userId}, ServerRoutes.checkFriendRequest)
      .then(function(response){
        //determine the proper sentence ending for the amount of friend requests
        $scope.allRequesters = response.friendRequesters;
        $scope.requestersAmount = $scope.allRequesters.length;
        $scope.sentenceEnd = AddFriendsFactory.getSentenceEnd($scope.requestersAmount);
      })
      .catch(function(error){
          console.log(error);
      });
  }
  $scope.getPendingRequests();

  $scope.acceptFriend = function(requesterId, index){
    var dataToSend = {userId: userId, requesterId: requesterId}
    ServerRequests.post(dataToSend, ServerRoutes.confirmFriend)
      .then(function(response){
        console.log(response.text);
        $scope.allRequesters.splice(index, 1);
        $scope.requestersAmount = $scope.allRequesters.length;
        console.log($scope.allRequesters);
      })
      .catch(function(error){
          console.log(error);
      });
  }

  $scope.declineFriend = function(requesterId, index){
    var dataToSend = {userId: userId, requesterId: requesterId}
    ServerRequests.post(dataToSend, ServerRoutes.declineFriend)
      .then(function(response){
        console.log(response.text);
        $scope.allRequesters.splice(index, 1);
        $scope.requestersAmount = $scope.allRequesters.length;
        console.log($scope.allRequesters);
      })
      .catch(function(error){
          console.log(error);
      });
  }


})
