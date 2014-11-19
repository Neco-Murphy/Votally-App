angular.module('App.Receivers', [])

.controller('ReceiversController', function($scope, $location, $window, ReceiversFactory, ServerRequests, ServerRoutes) {

  $scope.cancelSend = function(){
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    $location.path('/'); 
  }

  $scope.allReceivers = {};

  //when send button is clicked on receivers page,
  //send current selected receivers (as an array) to Receivers Factory
  $scope.setReceivers = function(){
    //move selectedReceivers from view format to model format
    for (var key in $scope.viewSelectedReceivers) {
      $scope.modelSelectedReceivers.push(key);
    }
    //send receivers to ReceiversFactory, get back content & receivers in object
    var sendContent = ReceiversFactory.addReceivers($scope.modelSelectedReceivers);

    //make post request with content and receivers object
    ServerRequests.post(sendContent, ServerRoutes.postContent);
    
    //empty the content storage in the ReceiversFactory
    ReceiversFactory.resetContentFromHome();
    
    //route back to the home page
    $location.path('/'); 
  };

  //get the userId from local storage
  var userId = $window.localStorage.getItem('userId');

  //if there is no stored content in Receivers Factory route back to home
  console.log(ReceiversFactory.getHomeContent());
  if (Object.getOwnPropertyNames(ReceiversFactory.getHomeContent()).length === 0){
    //empty the content storage in the ReceiversFactory just in case
    ReceiversFactory.resetContentFromHome();
    
    //route back to the home page
    $location.path('/'); 

  } else {
    //populate a user's friends from the database
    ServerRequests.post(userId, ServerRoutes.getReceivers)
      .then(function(response){
        $scope.allReceivers = response.receivers;
      })
      .catch(function(error){
          console.error(error);
      });
  }

  //an array to send to the server in the content object
  $scope.modelSelectedReceivers = [];
    
  //a place to store a list of receivers that have been selected in the view
  $scope.viewSelectedReceivers = {};

  //pushes a receiver object to the selectedReceivers array when the receiver is clicked
  $scope.select = function(receiver){
    if ($scope.viewSelectedReceivers[receiver.friendId]){
      delete $scope.viewSelectedReceivers[receiver.friendId];
    } else {
      $scope.viewSelectedReceivers[receiver.friendId] = receiver.username;
    }
  }

  //determines if specific receiver is selected (for visual representation in view)
  $scope.isSelected = function(receiver){
    return Boolean($scope.viewSelectedReceivers[receiver.friendId]);
  }
  
});