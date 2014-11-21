angular.module('App.HomeFactory', [])
.factory('HomeFactory', function(ServerRequests, ServerRoutes){

  var checkUpdates = function(userId){
    return ServerRequests.post({ userId: userId }, ServerRoutes.checkUpdates)
    .then(function(response){
      //response will look like
      // {
      //   pendingCount: number,
      //   friendRequestCount: number
      // }
      return response;
    })
    //if there is an error getting the pendings, console an error.
    .catch(function(error){
      console.log(error);
    });
  };

  return {
    checkUpdates: checkUpdates
  };

});
