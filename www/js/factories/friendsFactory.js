angular.module('App.FriendsFactory', [])

.factory('FriendsFactory', function(ServerRequests, ServerRoutes, $window){

  var userInfo = {
    username: '',
    email: ''
  }

  //make a post request to get username and email and store results
  var getUsername = function(userId){
    ServerRequests.post({userId: userId}, ServerRoutes.getUsername)
      .then(function(data){
        userInfo.email = data.email
        userInfo.username = data.username
      })
      .catch(function(error){
          console.log(error);
      });
  }

  return {
    userInfo: userInfo,
    getUsername: getUsername
  };
});
