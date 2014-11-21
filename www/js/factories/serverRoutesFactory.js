angular.module('App.ServerRoutes', [])

.factory('ServerRoutes', function(){
  //return an object of the routes
  return {
  	//change the routes once our server is deployed.
    sendContent: '/receivers/sendContent',
    getPending: '/pending/getPending',
    sendVote: '/pending/sendVote',
    getResults: '/results/getResults',
    getReceivers: '/receivers/getContacts',
    postContent: '/receivers/sendContent',
    requestFriend: '/friends/requestFriend',
    checkUpdates: '/home/checkUpdates'
  };
});
