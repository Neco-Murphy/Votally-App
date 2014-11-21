angular.module('App.PendingFactory', [])
.factory('PendingFactory', function(ServerRequests, ServerRoutes){

  var getPending = function(userId){
    return ServerRequests.post({ userId: userId }, ServerRoutes.getPending)
    .then(function(response){
      //  response looks like...
      // {
      //  pendingContents: [{
      //    contentId: number,
      //    topic: string,
      //    picture: undefined(url?)
      //    userId: number,
      //    userName: string
      //  }, {}, ...]
      // } 
      return response.contents;
    })
    //if there is an error getting the pendings, console an error.
    .catch(function(error){
      console.log(error);
    });
    
  };

  return {
    getPending: getPending
  };

});
