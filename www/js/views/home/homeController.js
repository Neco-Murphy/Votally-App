angular.module('App.Home', [])

//Retrieves and overwrites the default regexp that is used to whitelist safe urls during img sanitization
//Normalizes any url about to be used in img(src) and returns an absolute path
.config(function($compileProvider) {
  $compileProvider
    .imgSrcSanitizationWhitelist(/^\s*(https?|blob|cdvfile|content|ftp|mailto|file|tel):|data:image\//);
})

.controller('HomeController', function($scope, $location, $window, ReceiversFactory, Auth, Camera, HomeFactory) {

  var userId = $window.localStorage.getItem('userId');

  //Holds the pic/text content that will be sent
  $scope.content = {
    topic: '',
    picture: '',
    userId: 0
  }

  //sends to new routes when home page is swiped
  $scope.swiping = function(direction){
    if (direction === 'left'){
      $location.path('/results');
    }
    if (direction === 'right'){
      $location.path('/friends');
    }
  }

  //clicking the pending button routes to pendingView 
  $scope.routeToPending = function(){
    $location.path('/pending');
  };

  //clicking the friend + button routes to addFriendsView 
  $scope.routeToAddFriends = function(){
    $location.path('/addFriends');
  };

  //sends to receivers when Send button is pushed
  $scope.send = function(){
    //if there is no picture and no message, do nothing
    if ($scope.content.topic === '' && $scope.content.picture  === ''){
      return;
    }
    else {
      $scope.content.userId = userId;
      //sends content to be stored in ReceiversFactory
      ReceiversFactory.contentFromHome($scope.content);
      //sends user to receiver route
      $location.path('/receivers');
    }
  }

  //dynamically updates the content object's topic property as text is changed
  $scope.addText = function(newText){
    $scope.content.topic = newText;
  }

  //calls the getPicture function from the factory allowing the user to upload/take pictures
  $scope.getPhoto = function(option) {
    Camera.getPicture(option)
      .then(function(imageData) {
        $scope.content.picture = "data:image/jpeg;base64," + imageData;
        document.getElementById('myImage').src = $scope.content.picture;
      }, function(error) {
        alert(error); 
      }, option);
  }

  //check if there is any pending or friend request with the factory and set the count.
  HomeFactory.checkUpdates(userId)
  .then(function(data){
    $scope.pendingCount = data.pendingCount;
    $scope.hasFriendRequest = data.friendRequestCount;
    $scope.resultCompleteCount = data.resultCompleteCount;
  });

});

